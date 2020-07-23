import React from 'react';
import { Router, Route } from 'react-router-dom';
import { customHistory } from './services';
import {
  PrivateRoute,
  LoginRoute,
  HomeRoute,
  ResetPasswordRoute,
  ForgotPasswordRoute,
  RegisterRoute,
  UserRoute
} from './routes';

import './App.scss';
import { renderPage } from './utils'
import { GlobalStateProvider } from './shared/state-handler/state-provider';

export default () => (
  <GlobalStateProvider>
    <Router history={customHistory}>
      <PrivateRoute
        routeProps = {{exact: true, path: '/'}}
        Component={() => renderPage(HomeRoute)}
      />
      <PrivateRoute
        routeProps = {{exact: true, path: '/user'}}
        Component={() => renderPage(UserRoute)}
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
  </GlobalStateProvider>
)
