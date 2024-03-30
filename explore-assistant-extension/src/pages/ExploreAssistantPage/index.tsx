import {
  Aside,
  Box,
  Button,
  FieldTextArea,
  Heading,
  Layout,
  Paragraph,
  Tab2,
  Tabs2,
} from '@looker/components'
import React, { FormEvent, useCallback, useContext, useEffect } from 'react'
import { ExploreEmbed } from '../../components/ExploreEmbed'
import BardLogo from '../../components/BardLogo'
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
  const [query, setQuery] = React.useState<string>('')
  const [submit, setSubmit] = React.useState<boolean>(false)
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
    async ({ prompt }: { prompt: string }) => {
      const question = prompt !== undefined ? prompt : query

      const contents = `
    Context
    ----------

    Youre a developer who would transalate questions to a structured URL query based on the following dictionary - choose only the fileds in the below description user_order_facts is an extension of user and should be used when referring to users or customers.Generate only one answer, no more.

    LookML Metadata
    ----------

    Dimensions Used to group by information (follow the instructions in tags when using a specific field; if map used include a location or lat long dimension;):
        ${dimensions.join(';')}
      
    Measures are used to perform calculations (if top, bottom, total, sum, etc. are used include a measure):
        ${measures.join(';')}

    Example
    ----------
    ${examples
      .map((item) => `input: ${item['input']} ; output: ${item['output']}`)
      .join('\n')}

    Input
    ----------
    ${question}

    Output
    ----------
`

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
      dispatch(addToHistory({ message: question, url: newExploreUrl }))

      //await extensionSDK.localStorageSetItem(`chat_history`, JSON.stringify(data))
    },
    [dimensions, measures],
  )

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setQuery(e.currentTarget.value)
  }

  /**
   * Handles the form submission.
   *
   * @param prompt - The optional prompt string.
   */
  const handleSubmit = async (prompt: string | undefined) => {
    data[prompt !== undefined ? prompt : query] = {
      message: prompt !== undefined ? prompt : query,
    }
    await extensionSDK.localStorageSetItem(`chat_history`, JSON.stringify(data))
    setData(data)
    setSubmit(true)
    fetchData(prompt, exploreData)
  }

  /**
   * Handles the submission of an example prompt.
   * @param {string} prompt - The prompt to submit.
   * @returns {Promise<void>} - A promise that resolves when the submission is complete.
   */
  const handleExampleSubmit = async (prompt: string) => {
    setQuery(prompt)
    handleSubmit(prompt)
    const elem = document.getElementById('historyScroll')
    if (elem) {
      elem.scrollTop = elem.scrollHeight
    }
  }

  /**
   * Handles the submission of a historical prompt. Doesn't issue a new network request
   * @param {string} prompt - The prompt to submit.
   * @returns {Promise<void>} - A promise that resolves when the submission is complete.
   */
  const handleHistorySubmit = async (prompt: string) => {
    const res = await extensionSDK.localStorageGetItem(`chat_history`) //getData('chat',prompt)
    setSubmit(true)
    setQuery(prompt)
    setExploreUrl(JSON.parse(res)[prompt].url)
  }

  return (
    <>
      <Layout hasAside={true}>
        <Aside
          paddingX={'u8'}
          paddingY={'u4'}
          minWidth={'350px'}
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
            value={query}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(undefined)}
            onChange={handleChange}
          />
          <Button
            my={'u6'}
            disabled={submit}
            onClick={() => handleSubmit(undefined)}
          >
            Run Prompt
          </Button>

          <Tabs2 distributed>
            <Tab2 id="examples" label="Sample Prompts">
              <SamplePrompts handleExampleSubmit={handleExampleSubmit} />
            </Tab2>
            <Tab2 id="history" label="Your History">
              <PromptHistory handleHistorySubmit={handleHistorySubmit} />
            </Tab2>
          </Tabs2>
        </Aside>
        <Box width={'100%'}>
          <BardLogo />
          {isQuerying && <BardLogo />}
          {exploreUrl && (
            <ExploreEmbed
              exploreUrl={exploreUrl}
              setExploreLoading={setExploreLoading}
              submit={submit}
              setSubmit={setSubmit}
            />
          )}
        </Box>
      </Layout>
    </>
  )
}

export default ExploreAssistantPage
