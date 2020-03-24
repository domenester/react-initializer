import React from 'react';
import { Router, Route } from 'react-router-dom';
import { customHistory } from './services'

import {
  PrivateRoute,
  LoginRoute,
  HomeRoute
} from './routes';

import './App.scss';
import { StateProvider } from './state-handler';
import { renderPage } from './utils'

export default () => (
  <StateProvider>
    <Router history={customHistory}>
      <PrivateRoute
        routeProps = {{exact: true, path: '/'}}
        component={() => renderPage(HomeRoute)}
      />
      <Route
        exact
        path='/login'
        component={() => renderPage(LoginRoute)}
      />
    </Router>
  </StateProvider>
)
