import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Page } from '@looker/components';
import styles from './styles.module.css';

import LandingPage from './pages/LandingPage';
import ExploreAssistantPage from './pages/ExploreAssistantPage';

const ExploreApp = () => {
  
  return (
    <Router>
      <Page height="100%" className={styles.root}>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/assistant">
            <ExploreAssistantPage />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
};

export const App = hot(ExploreApp);
