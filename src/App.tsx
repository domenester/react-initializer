import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import {
  PrivateRoute,
  LoginRoute,
  HomeRoute
} from './routes';

import './App.scss';

export default class App extends React.Component<{}, {}>{
  render() {
    return (
      <BrowserRouter>
        <PrivateRoute
          routeProps = {{exact: true, path: '/'}}
          component={HomeRoute}
        />
        <Route exact path='/login' component={LoginRoute} />
      </BrowserRouter>
    );
  }
}
