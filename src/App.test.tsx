import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

it('expect to render App without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
