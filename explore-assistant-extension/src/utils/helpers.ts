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

import { ExtensionContext } from "@looker/extension-sdk-react"
import process from "process"
import { useContext } from "react"
const VERTEX_AI_ENDPOINT = process.env.VERTEX_AI_ENDPOINT || ''
const VERTEX_BIGQUERY_LOOKER_MODEL = process.env.VERTEX_BIGQUERY_MODEL || ''
const VERTEX_BIGQUERY_MODEL_ID = process.env.VERTEX_BIGQUERY_MODEL_ID || ''

interface ModelParameters {
  max_output_tokens?: number
}

export const generateSQL = (model_id: string, prompt: string, parameters: ModelParameters) => {
  return `

  SELECT ml_generate_text_llm_result as r, ml_generate_text_status as status
  FROM
  ML.GENERATE_TEXT(
      MODEL ${model_id},
      (
        ${prompt}
      ),
      STRUCT(
      0.05 AS temperature,
      1024 AS max_output_tokens,
      0.98 AS top_p,
      TRUE AS flatten_json_output,
      1 AS top_k)
    )

    `
}

export const vertexBackendRequest = async (
  contents: string,
  parameters: ModelParameters,
) => {
  if (VERTEX_AI_ENDPOINT) {
    return vertextCloudFunction(contents, parameters)
  }

  if(VERTEX_BIGQUERY_LOOKER_MODEL && VERTEX_BIGQUERY_MODEL_ID) {
    return vertextBigQuery(contents, parameters)
  }
}

export const vertextBigQuery = async (
  contents: string,
  parameters: ModelParameters,
) => {

    const { core40SDK } = useContext(ExtensionContext)

    const createSQLQuery = await core40SDK.ok(
        core40SDK.create_sql_query(
          {
            model_name: VERTEX_BIGQUERY_LOOKER_MODEL,
            sql: generateSQL(VERTEX_BIGQUERY_MODEL_ID, contents, parameters),
        }))
      
      if(createSQLQuery.slug) {
        const runSQLQuery = await core40SDK.ok(core40SDK.run_sql_query(createSQLQuery.slug,'json'))
        const exploreData = await runSQLQuery[0]['generated_content']
        return exploreData
      }
}

export const vertextCloudFunction = async (
  contents: string,
  parameters: ModelParameters,
) => {
  const responseData = await fetch(VERTEX_AI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      contents: contents,
      parameters: parameters,
    }),
  })
  const response = await responseData.text()
  return response.trim()
}
