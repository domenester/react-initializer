import React from 'react';
import { Router, Route } from 'react-router-dom';
import { customHistory } from './services';
import { HomeRoute } from './routes';

import './App.scss';
import { renderPage } from './utils'

export default () => (
  <Router history={customHistory}>
    <Route
      exact
      path='/'
      component={() => renderPage(HomeRoute)}
    />
  </Router>
)
