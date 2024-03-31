import {
  Aside,
  Button,
  FieldTextArea,
  Heading,
  Layout,
  Paragraph,
  Section,
  Space,
  Tab2,
  Tabs2,
} from '@looker/components'
import React, { FormEvent, useCallback, useContext, useEffect } from 'react'
import { ExploreEmbed } from '../../components/ExploreEmbed'
import GeminiLogo from '../../components/GeminiLogo'
import { ExtensionContext } from '@looker/extension-sdk-react'

import examples from '../../../examples.json'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDimensions,
  setHistory,
  setIsQuerying,
  setMeasures,
  setExploreUrl,
  addToHistory,
} from '../../slices/assistantSlice'
import SamplePrompts from '../../components/SamplePrompts'
import PromptHistory from '../../components/PromptHistory'
import { RootState } from '../../store'

const ExploreAssistantPage = () => {
  const VERTEX_AI_ENDPOINT = process.env.VERTEX_AI_ENDPOINT || ''
  const LOOKER_MODEL = process.env.LOOKER_MODEL || ''
  const LOOKER_EXPLORE = process.env.LOOKER_EXPLORE || ''

  const dispatch = useDispatch()
  const [textAreaValue, setTextAreaValue] = React.useState<string>('')
  const { core40SDK, extensionSDK } = useContext(ExtensionContext)

  const { exploreUrl, isQuerying, dimensions, measures } = useSelector(
    (state: RootState) => state.assistant,
  )

  // fetch the chat history from local storage on startup
  useEffect(() => {
    extensionSDK.localStorageGetItem('chat_history').then((responses) => {
      if (responses === null) {
        return
      }
      const data = JSON.parse(responses)
      const history = []
      for (const [key, value] of Object.entries(data)) {
        if (key == '' || typeof value != 'object' || value == null) {
          continue
        }
        if (value['url'] == undefined || value['message'] == undefined) {
          continue
        }
        history.push({
          message: value['message'],
          url: value['url'],
        })
      }
      dispatch(setHistory(history))
    })
  }, [])

  // fetch the explore definition from Looker on startup
  useEffect(() => {
    core40SDK
      .ok(
        core40SDK.lookml_model_explore({
          lookml_model_name: LOOKER_MODEL,
          explore_name: LOOKER_EXPLORE,
          fields: 'fields',
        }),
      )
      .then(({ fields }) => {
        if (!fields || !fields.dimensions || !fields.measures) {
          return
        }
        const dimensions = fields.dimensions.map((field: any) => {
          const { name, type, description, tags } = field
          return {
            name: name,
            type: type,
            description: description,
            tags: tags,
          }
        })

        const measures = fields.measures.map((field: any) => {
          const { name, type, description, tags } = field
          return {
            name: name,
            type: type,
            description: description,
            tags: tags,
          }
        })
        dispatch(setDimensions(dimensions))
        dispatch(setMeasures(measures))
      })
  }, [])

  const fetchData = useCallback(
    async (prompt: string) => {

      function formatContent(field: { name?: string; type?: string; description?: string; tags?: string[] }) {
        let result = '';
        if (field.name) result += 'name: ' + field.name;
        if (field.type) result += (result ? ', ' : '') + 'type: ' + field.type;
        if (field.description) result += (result ? ', ' : '') + 'description: ' + field.description;
        if (field.tags && field.tags.length) result += (result ? ', ' : '') + 'tags: ' + field.tags.join(',');
      
        return result;
      }
      

      const contents = `
    Context
    ----------

    You're a developer who would transalate questions to a structured URL query based on the following dictionary - choose only the fileds in the below description user_order_facts is an extension of user and should be used when referring to users or customers.Generate only one answer, no more.

    LookML Metadata
    ----------

    Dimensions Used to group by information (follow the instructions in tags when using a specific field; if map used include a location or lat long dimension;):
        
  ${dimensions.map(formatContent).join('\n')}
      
    Measures are used to perform calculations (if top, bottom, total, sum, etc. are used include a measure):
  
  ${measures.map(formatContent).join('\n')}

    Example
    ----------

  ${examples
    .map((item) => `input: ${item['input']} ; output: ${item['output']}`)
    .join('\n')}

    Input
    ----------
    ${prompt}

    Output
    ----------
`
      dispatch(setIsQuerying(true))
      dispatch(setExploreUrl(''))
    
      const responseData = await fetch(VERTEX_AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          contents: contents,
          parameters: {
            max_output_tokens: 1000,
          },
        }),
      })

      const exploreData = await responseData.text()
      const newExploreUrl = exploreData.trim() + '&toggle=dat,pik,vis'

      dispatch(setExploreUrl(newExploreUrl))
      dispatch(setIsQuerying(false))
      dispatch(addToHistory({ message: prompt, url: newExploreUrl }))

      //await extensionSDK.localStorageSetItem(`chat_history`, JSON.stringify(data))
    },
    [dimensions, measures],
  )

  const handleSubmit = useCallback(async () => {
    fetchData(textAreaValue)
  }, [textAreaValue])

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value)
  }

  const handlePromptSubmit = (prompt: string) => {
    setTextAreaValue(prompt)
    fetchData(prompt)
  }

  return (
    <>
      <Layout height={'100%'} hasAside={true}>
        <Aside
          paddingX={'u8'}
          paddingY={'u4'}
          minWidth={'400px'}
          borderRight={'key'}
        >
          <Heading fontSize={'xxlarge'} fontWeight={'semiBold'}>
            Explore Assistant
          </Heading>
          <Paragraph fontSize={'small'} marginBottom={'u4'}>
            Ask questions of a sample Ecommerce dataset powered by the Gemini
            model on Vertex AI.
          </Paragraph>
          <FieldTextArea
            label="Type your prompt in here"
            description="💡 Tip: Try asking for your data output in a viz!"
            value={textAreaValue}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            onChange={handleChange}
            disabled={isQuerying}
          />
          <Button
            my={'u6'}
            disabled={isQuerying}
            onClick={() => handleSubmit()}
          >
            Run Prompt
          </Button>
          <Section>
            <Tabs2 defaultTabId="prompts" distributed>
              <Tab2 id="prompts" label="Sample Prompts">
                <SamplePrompts handleSubmit={handlePromptSubmit} />
              </Tab2>
              <Tab2 id="history" label="Your History">
                <PromptHistory handleSubmit={handlePromptSubmit} />
              </Tab2>
            </Tabs2>
          </Section>
        </Aside>
        <Section height="100%">
          {exploreUrl != '' ? (
            <ExploreEmbed />
          ) : (
            <Space
              height="100%"
              width="100%"
              align={'center'}
              justify={'center'}
            >
              <GeminiLogo width={'300px'} animate={isQuerying} />
            </Space>
          )}
        </Section>
      </Layout>
    </>
  )
}

export default ExploreAssistantPage
