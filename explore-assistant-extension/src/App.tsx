import React, { useEffect, useContext } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getExtensionSDK } from '@looker/extension-sdk'
import {
  setExploreId,
  setExploreName,
  setModelName,
  setTheme
} from './slices/assistantSlice'
import { useLookerFields } from './hooks/useLookerFields'
import { useBigQueryExamples } from './hooks/useBigQueryExamples'
import AgentPage from './pages/AgentPage'

const lightModeColors = {
  '--chat-color': '#F2F2F2',
  '--chat-secondary-color': 'rgba(225,227,231,0.3)',
  '--text-primary-color': '#202124',
  '--text-secondary-color': '#303134',
  '--text-tertiary-color': '#5f6368',
  '--prompt-primary-color': 'rgb(255 255 255 / 0.8)',
  '--prompt-secondary-color': 'rgb(240 244 249)',
  '--settings-primary-color': '#FFF',
};

const darkModeColors = {
  '--chat-color': '#121212',
  '--chat-secondary-color': '#8b6c435e',
  '--text-primary-color': '#ffffff',
  '--text-secondary-color': '#d3d0d0',
  '--text-tertiary-color': '#9c9a9a',
  '--prompt-primary-color': 'transparent',
  '--prompt-secondary-color': 'rgb(240 244 249 / 0.2)',
  '--settings-primary-color': 'rgb(240 244 249 / 0.7)',
};

const ExploreApp = () => {
  const dispatch = useDispatch()
  const { lookerHostData } = getExtensionSDK()
  const LOOKER_EXPLORE_ID =
    `${process.env.LOOKER_MODEL}/${process.env.LOOKER_EXPLORE}` || ''
  useEffect(() => {
    dispatch(setExploreId(LOOKER_EXPLORE_ID))
    dispatch(setModelName(process.env.LOOKER_MODEL || ''))
    dispatch(setExploreName(process.env.LOOKER_EXPLORE || ''))

    const urlParam = new URL(lookerHostData?.route, 'http://example.com').searchParams.get('app_theme');
    if(!urlParam) {
      return
    }
 
    dispatch(setTheme(urlParam))
    const root = document.documentElement;
    const colors = urlParam === 'dark' ? darkModeColors : lightModeColors
    Object.entries(colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
  
  }, [])


  // load dimensions and measures into the state
  useLookerFields()
  useBigQueryExamples()

  return (
    <>
        <Switch>
          <Route path="/index" exact>
              <AgentPage />
          </Route>
          <Route>
            <Redirect to="/index" />
          </Route>
        </Switch>
    </>
  )
}

export const App = hot(ExploreApp)
