/*

MIT License

Copyright (c) 2023 Looker Data Sciences, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import React, { useContext, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import {
  Page,
  SpaceVertical,
  FieldTextArea,
  Tabs2,
  Tab2,
} from '@looker/components'
import { ExtensionContext } from '@looker/extension-sdk-react'
import type { ChangeEvent } from 'react'
import { ExploreEmbed } from './components/ExploreEmbed'
import styles from './styles.module.css'

// import { initDB, addData, getStoreData, updateData, getData } from './db'
import examples from '../examples.json'
import LandingPage from './pages/LandingPage'
import BardLogo from './components/BardLogo'

const VERTEX_AI_ENDPOINT = process.env.VERTEX_AI_ENDPOINT || ''
const LOOKER_MODEL = process.env.LOOKER_MODEL || ''
const LOOKER_EXPLORE = process.env.LOOKER_EXPLORE || ''

const ExploreAssistant = () => {
  const { core40SDK, extensionSDK } = useContext(ExtensionContext)
  const [exploreUrl, setExploreUrl] = React.useState<any>('')
  const [exploreLoading, setExploreLoading] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>('')
  const [begin, setBegin] = React.useState<boolean>(false)
  const [submit, setSubmit] = React.useState<boolean>(false)
  const [db, setDb] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>({})
  const [exploreData, setExploreData] = React.useState<any>(null)

  /**
   * Initializes the application by performing the following steps:
   * 1. Initializes the database.
   * 2. Retrieves data from the 'chat history' store.
   * 3. Retrieves the fields of the specified LookML model explore.
   * 4. Extracts dimensions and measures from the fields.
   * 5. Sets the explore data with the extracted dimensions and measures.
   */
  const initialize = async () => {
    // const status = await initDB()
    // setDb(status)
    // const responses = await getStoreData('chat')
    const responses = await extensionSDK.localStorageGetItem('chat_history')
    setData(responses === null ? {} : JSON.parse(responses))
    const { fields } = await core40SDK.ok(
      core40SDK.lookml_model_explore(
        {
          lookml_model_name: LOOKER_MODEL,
          explore_name: LOOKER_EXPLORE,
          fields: 'fields'
        }
      )
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
    if (begin) {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [begin])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  /**
   * Fetches data from the VERTEX_AI_ENDPOINT based on the provided prompt and fields.
   * If prompt is undefined, it uses the query as the prompt.
   * @param prompt - The prompt to be used for the question.
   * @param fields - The fields object containing dimensions and measures.
   * @returns {Promise<void>} - A promise that resolves when the data is fetched.
   */
  const fetchData = async (prompt: string | undefined, fields?: any): Promise<void> => {
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
    ${examples.map((item) => `input: ${item['input']} ; output: ${item['output']}` ).join('\n')}

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

    console.log(responseData)

    const exploreData = await responseData.text()
    setExploreUrl(exploreData.trim() + '&toggle=dat,pik,vis')
    // await updateData('chat',question, { message: question, url: exploreData.trim() + '&toggle=dat,pik,vis'})
    data[question] = { message: question, url: exploreData.trim() + '&toggle=dat,pik,vis'}
    await extensionSDK.localStorageSetItem(`chat_history`,JSON.stringify(data))
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
    data[prompt !== undefined ? prompt : query] = { message: prompt !== undefined ? prompt : query}
    await extensionSDK.localStorageSetItem(`chat_history`,JSON.stringify(data))
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
    <Page height="100%" className={styles.root}>
      {!begin && <LandingPage begin={setBegin} />}
      {begin && (
        <SpaceVertical>
          <div
            className={styles.scrollbar}
            id={styles.layout}
          >
            <div
              className={styles.scrollbar}
              id={styles.subLayout}
            >
              <span className={styles.heading}>
                Explore Assistant
              </span>
              <span className={styles.text}>
                Ask questions of a sample Ecommerce dataset powered by the Gemini model on Vertex AI.
              </span>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop:'1.2rem'
                }}
              >
                <FieldTextArea
                  label="Type your prompt in here"
                  description="💡 Tip: Try asking for your data output in a viz!"
                  value={query}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(undefined)}
                  description="Trained on an Ecommerce Dataset. Try asking for your data output in a viz!"
                  value={query}
                  onChange={handleChange}
                  width={'100%'}
                />
                <div
                  style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 'auto' }}>
                    <button
                      disabled={submit}
                      onClick={() => handleSubmit(undefined)}
                      className={styles.customButton}
                      style={{ width: '100%', backgroundColor: 'rgb(26,115,232)', transition: 'background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1)' }}
                    >
                      Run Prompt
                    </button>
                  </div>
                </div>
                <Tabs2 distributed>
                  <Tab2 id="examples" label="Sample Prompts">
                    <div
                      className={styles.scrollbar}
                      style={{ overflowY: 'scroll', height: '40vh', display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center' }}
                    >
                      {(categorizedPrompts).map((item, index: number) => (
                        <div
                          key={index}
                          className={styles.card}
                          onClick={() => {
                            handleExampleSubmit(item.prompt)
                          }}
                        >
                          <span style={{ color: `${item.color}`}} className={styles.subHeading}>
                            {item.category}
                          </span>
                          <span className={styles.text} id="examplePrompt">
                            {item.prompt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Tab2>
                  <Tab2 id="history" label="Your History">
                    <div
                      className={styles.scrollbar}
                      id="historyScroll"
                      style={{ overflowY: 'scroll', height: '40vh', display:'flex',flexDirection:'column',justifyContent:'flex-start', alignItems:'center' }}
                    >
                      {
                      // db &&
                        Object.keys(data).length > 0 &&
                        Object.keys(data)
                          .filter((item: any) => data[item].message !== '')
                          .map((item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                onClick={() => handleHistorySubmit(data[item].message)}
                                className={styles.card}
                              >
                                <span className={styles.text}>
                                  {data[item].message}
                                </span>
                              </div>
                            )
                          })}
                    </div>
                  </Tab2>
                </Tabs2>
              </div>
            </div>
            <div
              style={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#f7f7f7',
                zIndex: 1,
              }}
            >
                <div
                  style={{
                    position:'relative',
                    backgroundColor: '#f7f7f7',
                    height: '100vh',
                    width: '100%',
                  }}
                >
                  <div style={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    position:'absolute',
                    zIndex:!exploreLoading ? 1 : -1
                  }}>
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
                </div>
            </div>
          </div>
        </SpaceVertical>
      )}
    </Page>
  )
}

export const App = hot(ExploreAssistant)
