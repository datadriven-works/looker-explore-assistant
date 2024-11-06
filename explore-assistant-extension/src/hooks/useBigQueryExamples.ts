import { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setExploreGenerationExamples,
  setExploreRefinementExamples,
  setExploreSamples,
  ExploreSamples,
  setisBigQueryMetadataLoaded,
  setCurrenExplore,
  RefinementExamples,
  ExploreExamples,
  AssistantState,
} from '../slices/assistantSlice'

import { ExtensionContext } from '@looker/extension-sdk-react'
import process from 'process'
import { useErrorBoundary } from 'react-error-boundary'
import { RootState } from '../store'

export const useBigQueryExamples = () => {
  const connectionName =
    process.env.BIGQUERY_EXAMPLE_PROMPTS_CONNECTION_NAME || ''
  const datasetName =
    process.env.BIGQUERY_EXAMPLE_PROMPTS_DATASET_NAME || 'explore_assistant'

  const dispatch = useDispatch()
  const { showBoundary } = useErrorBoundary()
  const { isBigQueryMetadataLoaded } = useSelector(
    (state: RootState) => state.assistant as AssistantState
  )

  const { core40SDK } = useContext(ExtensionContext)

  const runSQLQuery = async (sql: string) => {
    try {
      if (!connectionName) {
        throw new Error('Connection name is not provided.')
      }
      const createSqlQuery = await core40SDK.ok(
        core40SDK.create_sql_query({
          connection_name: connectionName,
          sql: sql,
        })
      )
      const { slug } = createSqlQuery
      if (slug) {
        const runSQLQuery = await core40SDK.ok(
          core40SDK.run_sql_query(slug, 'json')
        )
        const examples = runSQLQuery
        return examples
      }
      return []
    } catch (error) {
      showBoundary(error)
      throw error
    }
  }

  const getExamplePrompts = async () => {
    if (connectionName) {
      const sql = `
        SELECT
            explore_id,
            examples
        FROM
          \`${datasetName}.explore_assistant_examples\`
      `
      return runSQLQuery(sql)
        .then((response) => {
          if (!response || !Array.isArray(response) || response.length === 0) {
            return
          }
          const generationExamples: ExploreExamples = {}
          response.forEach((row: any) => {
            generationExamples[row['explore_id']] = JSON.parse(
              row['examples']
            )
          })
          dispatch(setExploreGenerationExamples(generationExamples))
        })
        .catch((error) => showBoundary(error))
    } else {
      const generationExamples = require('../../../explore-assistant-examples/examples.json')
      dispatch(setExploreGenerationExamples(generationExamples))
    }
  }

  const getRefinementPrompts = async () => {
    if (connectionName) {
      const sql = `
        SELECT
            explore_id,
            examples
        FROM
          \`${datasetName}.explore_assistant_refinement_examples\`
      `
      return runSQLQuery(sql)
        .then((response) => {
          if (!response || !Array.isArray(response) || response.length === 0) {
            return
          }
          const refinementExamples: RefinementExamples = {}
          response.forEach((row: any) => {
            refinementExamples[row['explore_id']] = JSON.parse(
              row['examples']
            )
          })
          dispatch(setExploreRefinementExamples(refinementExamples))
        })
        .catch((error) => showBoundary(error))
    } else {
      const refinementExamples = require('../../../explore-assistant-examples/refinement_examples.json')
      dispatch(setExploreRefinementExamples(refinementExamples))
    }
  }

  const getSamples = async () => {
    if (connectionName) {
      const sql = `
        SELECT
            explore_id,
            samples
        FROM
          \`${datasetName}.explore_assistant_samples\`
      `
      return runSQLQuery(sql)
        .then((response) => {
          if (!response || !Array.isArray(response) || response.length === 0) {
            return
          }
          const exploreSamples: ExploreSamples = {}
          response.forEach((row: any) => {
            exploreSamples[row['explore_id']] = JSON.parse(row['samples'])
          })
          const exploreKey: string = response[0]['explore_id']
          const [modelName, exploreId] = exploreKey.split(':')
          dispatch(setExploreSamples(exploreSamples))
          dispatch(
            setCurrenExplore({
              exploreKey,
              modelName,
              exploreId,
            })
          )
        })
        .catch((error) => showBoundary(error))
    } else {
      // Handle the case when connectionName is not set
      console.log('Using local samples')
      const exploreSamples = require('../../../explore-assistant-examples/samples.json')
      dispatch(setExploreSamples(exploreSamples))
      const modelName = process.env.LOOKER_MODEL || 'default_model'
      const exploreId = process.env.LOOKER_EXPLORE || 'default_explore'
      const exploreKey = `${modelName}:${exploreId}`
      console.log('Setting current explore', exploreKey)
      dispatch(
        setCurrenExplore({
          exploreKey,
          modelName,
          exploreId,
        })
      )
    }
  }

  // Create a ref to track if the hook has already been called
  const hasFetched = useRef(false)

  // get the example prompts provide completion status
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    // if we already fetched everything, return
    if (isBigQueryMetadataLoaded) return

    dispatch(setisBigQueryMetadataLoaded(false))

    const fetchData = async () => {
      try {
        await Promise.all([getExamplePrompts(), getRefinementPrompts(), getSamples()])
        dispatch(setisBigQueryMetadataLoaded(true))
      } catch (error) {
        showBoundary(error)
        dispatch(setisBigQueryMetadataLoaded(false))
      }
    }

    fetchData()
  }, [showBoundary])
}
