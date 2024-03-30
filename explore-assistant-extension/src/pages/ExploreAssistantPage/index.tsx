import {
  Aside,
  Box,
  Button,
  Span,
  FieldTextArea,
  Heading,
  Paragraph,
  Space,
  Tab2,
  Tabs2,
  Card,
} from '@looker/components'
import React, { FormEvent, useContext, useEffect } from 'react'
import { ExploreEmbed } from '../../components/ExploreEmbed'
import BardLogo from '../../components/BardLogo'
import { ExtensionContext } from '@looker/extension-sdk-react'

import examples from '../../../examples.json'

interface SamplePromptsProps {
  handleExampleSubmit: (prompt: string) => void
}
const SamplePrompts = ({ handleExampleSubmit }: SamplePromptsProps) => {
  const categorizedPrompts = [
    {
      category: 'Cohorting',
      prompt: 'Count of Users by first purchase date',
      color: 'blue',
    },
    {
      category: 'Audience Building',
      prompt:
        'Users who have purchased more than 100 dollars worth of Calvin Klein products and have purchased in the last 30 days',
      color: 'green',
    },
    {
      category: 'Period Comparison',
      prompt:
        'Total revenue by category this year compared to last year in a line chart with year pivoted',
      color: 'red',
    },
  ]
  return (
    <div>
      {categorizedPrompts.map((item, index: number) => (
        <Box
          cursor="pointer"
          key={index}
          onClick={() => {
            handleExampleSubmit(item.prompt)
          }}
        >
          <Card border={'ui1'} fontSize={'small'} m="u1" px="u2" py="u4">
            <Heading
              fontSize={'small'}
              fontWeight={'semiBold'}
              style={{ color: `${item.color}` }}
            >
              {item.category}
            </Heading>
            <Paragraph mt='u2'>{item.prompt}</Paragraph>
          </Card>
        </Box>
      ))}
    </div>
  )
}

interface PromptHistoryProps {
  handleHistorySubmit: (prompt: string) => void
}
const PromptHistory = ({ handleHistorySubmit }: PromptHistoryProps) => {
  const [data, setData] = React.useState<any>({})
  const { extensionSDK } = useContext(ExtensionContext)

  const fetchHistory = async () => {
    const responses = await extensionSDK.localStorageGetItem('chat_history')
    setData(responses === null ? {} : JSON.parse(responses))
  }

  useEffect(() => {
    fetchHistory()
  }, [])
  return (
    <>
      {Object.keys(data).length > 0 &&
        Object.keys(data)
          .filter((item: any) => data[item].message !== '')
          .map((item: any, index: number) => {
            return (
              <Card
                m={'u4'}
                border={'ui1'}
                borderRadius={'large'}
                p="u2"
                key={index}
                onClick={() => handleHistorySubmit(data[item].message)}
              >
                <Box cursor="pointer">
                  <Span fontSize={'small'}>{data[item].message}</Span>
                </Box>
              </Card>
            )
          })}
    </>
  )
}

const ExploreAssistantPage = () => {
  const VERTEX_AI_ENDPOINT = process.env.VERTEX_AI_ENDPOINT || ''
  const LOOKER_MODEL = process.env.LOOKER_MODEL || ''
  const LOOKER_EXPLORE = process.env.LOOKER_EXPLORE || ''

  const [exploreUrl, setExploreUrl] = React.useState<any>('')
  const [exploreLoading, setExploreLoading] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>('')
  const [submit, setSubmit] = React.useState<boolean>(false)
  const [exploreData, setExploreData] = React.useState<any>(null)
  const { core40SDK, extensionSDK } = useContext(ExtensionContext)

  /**
   * Initializes the application by performing the following steps:
   * 1. Initializes the database.
   * 2. Retrieves data from the 'chat history' store.
   * 3. Retrieves the fields of the specified LookML model explore.
   * 4. Extracts dimensions and measures from the fields.
   * 5. Sets the explore data with the extracted dimensions and measures.
   */
  const initialize = async () => {
    const { fields } = await core40SDK.ok(
      core40SDK.lookml_model_explore({
        lookml_model_name: LOOKER_MODEL,
        explore_name: LOOKER_EXPLORE,
        fields: 'fields',
      }),
    )
    const dimensions = fields.dimensions.map((field: any) => {
      const { name, type, description, tags } = field
      return (
        'name: ' +
        name +
        ', type: ' +
        type +
        ', description: ' +
        description +
        ', tags (use tags to help inform what to do with this field when constructing the url): ' +
        tags.join(',') +
        '\n'
      )
    })
    const measures = fields.measures.map((field: any) => {
      const { name, type, description, tags } = field
      return (
        'name: ' +
        name +
        ', type: ' +
        type +
        ', description: ' +
        description +
        ', tags: ' +
        tags.join(',') +
        '\n'
      )
    })
    setExploreData({ dimensions: dimensions, measures: measures })
  }

  useEffect(() => {
    initialize()
  }, [])

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setQuery(e.currentTarget.value)
  }

  /**
   * Fetches data from the VERTEX_AI_ENDPOINT based on the provided prompt and fields.
   * If prompt is undefined, it uses the query as the prompt.
   * @param prompt - The prompt to be used for the question.
   * @param fields - The fields object containing dimensions and measures.
   * @returns {Promise<void>} - A promise that resolves when the data is fetched.
   */
  const fetchData = async (
    prompt: string | undefined,
    fields?: any,
  ): Promise<void> => {
    const question = prompt !== undefined ? prompt : query

    const contents = `
    Context
    ----------

    Youre a developer who would transalate questions to a structured URL query based on the following dictionary - choose only the fileds in the below description user_order_facts is an extension of user and should be used when referring to users or customers.Generate only one answer, no more.

    LookML Metadata
    ----------

    Dimensions Used to group by information (follow the instructions in tags when using a specific field; if map used include a location or lat long dimension;):
        ${fields.dimensions.join(';')}
      
    Measures are used to perform calculations (if top, bottom, total, sum, etc. are used include a measure):
        ${fields.measures.join(';')}

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
    setExploreUrl(exploreData.trim() + '&toggle=dat,pik,vis')
    // await updateData('chat',question, { message: question, url: exploreData.trim() + '&toggle=dat,pik,vis'})
    data[question] = {
      message: question,
      url: exploreData.trim() + '&toggle=dat,pik,vis',
    }
    await extensionSDK.localStorageSetItem(`chat_history`, JSON.stringify(data))
  }

  /**
   * Handles the form submission.
   *
   * @param prompt - The optional prompt string.
   */
  const handleSubmit = async (prompt: string | undefined) => {
    // const status = await initDB()
    // setDb(status)
    // await addData('chat', { message: query })
    // setData([...data, { message: prompt !== undefined ? prompt : query }])
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
      <Space>
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
        <Box>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: !exploreLoading ? 1 : -1,
            }}
          >
            <BardLogo />
          </div>
          {exploreUrl && (
            <ExploreEmbed
              exploreUrl={exploreUrl}
              setExploreLoading={setExploreLoading}
              submit={submit}
              setSubmit={setSubmit}
            />
          )}
        </Box>
      </Space>
    </>
  )
}

export default ExploreAssistantPage
