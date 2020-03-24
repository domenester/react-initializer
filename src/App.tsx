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

export default () => (
  <StateProvider>
    <Router history={customHistory}> 
      <PrivateRoute
        routeProps = {{exact: true, path: '/'}}
        component={HomeRoute}
      />
      <Route
        exact
        path='/login'
        component={LoginRoute}
      />
    </Router>
  </StateProvider>
);
