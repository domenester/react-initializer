import React from 'react';
import { Router, Route } from 'react-router-dom';
import { customHistory } from './services'

import {
  PrivateRoute,
  LoginRoute,
  HomeRoute,
  ResetPasswordRoute,
  ForgotPasswordRoute,
  RegisterRoute
} from './routes';

import './App.scss';
import { StateProvider } from './shared/state-handler';
import { renderPage } from './utils'

export default () => (
  <StateProvider>
    <Router history={customHistory}>
      <PrivateRoute
        routeProps = {{exact: true, path: '/'}}
        Component={() => renderPage(HomeRoute)}
      />
      <Route
        exact
        path='/register'
        component={() => renderPage(RegisterRoute)}
      />
      <Route
        exact
        path='/forgot-password'
        component={() => renderPage(ForgotPasswordRoute)}
      />
      <Route
        exact
        path='/reset-password'
        component={() => renderPage(ResetPasswordRoute)}
      />
      <Route
        exact
        path='/login'
        component={() => renderPage(LoginRoute)}
      />
    </Router>
  </StateProvider>
)
