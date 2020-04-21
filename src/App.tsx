import React from 'react';
import { Router, Route } from 'react-router-dom';
import { customHistory } from './services'

import {
  PrivateRoute,
  LoginRoute,
  HomeRoute
} from './routes';

import './App.scss';
import { StateProvider } from './shared/state-handler';
import { renderPage } from './utils'
import { ForgotPasswordRoute } from './routes/forgot-password';

export default () => (
  <StateProvider>
    <Router history={customHistory}>
      <PrivateRoute
        routeProps = {{exact: true, path: '/'}}
        Component={() => renderPage(HomeRoute)}
      />
      <Route
        exact
        path='/forgot-password'
        component={() => renderPage(ForgotPasswordRoute)}
      />
      <Route
        exact
        path='/login'
        component={() => renderPage(LoginRoute)}
      />
    </Router>
  </StateProvider>
)
