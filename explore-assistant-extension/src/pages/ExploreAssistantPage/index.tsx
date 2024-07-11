import {
  Aside,
  Button,
  FieldTextArea,
  Heading,
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
import { useDispatch, useSelector } from 'react-redux'
import {
  addToHistory,
  setExploreParams,
  setHistory,
  setIsQuerying,
  setQuery,
} from '../../slices/assistantSlice'
import SamplePrompts from '../../components/SamplePrompts'
import PromptHistory from '../../components/PromptHistory'
import { RootState } from '../../store'
import useFetchData from '../../hooks/useSendVertexMessage'
import ExploreBasePage from '../ExploreBasePage/'

const ExploreAssistantPage = () => {
  const dispatch = useDispatch()
  const { generateExploreParams } = useFetchData()
  const [textAreaValue, setTextAreaValue] = React.useState<string>('')
  const { extensionSDK } = useContext(ExtensionContext)

  const { exploreParams, isQuerying, history, examples} = useSelector(
    (state: RootState) => state.assistant,
  )

  // fetch the chat history from local storage on startup
  useEffect(() => {
    extensionSDK.localStorageGetItem('chat_history').then((responses) => {
      if (responses === null) {
        return
      }
      const data = JSON.parse(responses)
      const localStorageHistory = []
      for (const [key, value] of Object.entries(data)) {
        if (key == '' || typeof value != 'object' || value == null) {
          continue
        }
        if (value['url'] == undefined || value['message'] == undefined) {
          continue
        }
        localStorageHistory.push({
          message: value['message'],
          url: value['url'],
        })
      }
      dispatch(setHistory(localStorageHistory))
    })
  }, [])

  const handleExploreParams = useCallback(
    async (query: string) => {
      dispatch(setIsQuerying(true))
      dispatch(setQuery(query))
      dispatch(setExploreParams(null))

      const newExploreParams = await generateExploreParams(query)

      dispatch(setExploreParams(newExploreParams))
      dispatch(setIsQuerying(false))

      const newHistoryItem = { message: query, url: newExploreParams }
      dispatch(addToHistory(newHistoryItem))
      const updatedHistory = [...history, newHistoryItem]
      await extensionSDK.localStorageSetItem(
        `chat_history`,
        JSON.stringify(updatedHistory),
      )
    },
    [history, examples],
  )

  const handleSubmit = useCallback(async () => {
    handleExploreParams(textAreaValue)
  }, [textAreaValue])

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value)
  }

  const handlePromptSubmit = (prompt: string) => {
    setTextAreaValue(prompt)
    handleExploreParams(prompt)
  }

  return (
      <ExploreBasePage>
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
            onKeyDown={(e:any) => {
              // nativeEvent.code check to determine if enter press is for submission or for accepting japanese kanji character
              if(e.key === 'Enter' && e.keyCode !== 229 ) {
                handleSubmit()
              }
            }}
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
          {exploreParams != '' ? (
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
      </ExploreBasePage>
  )
}

export default ExploreAssistantPage
