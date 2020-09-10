import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { customHistory } from '../services'

export const renderWithRouterAndContext = (
  component: JSX.Element
) => {
  return {
    ...render(
      <Router history={customHistory}> 
        {component}
      </Router>
    )
  }
}

export const renderWithRouterAndContextRaw = (
  component: JSX.Element
) => (
  <Router history={customHistory}> 
    {component}
  </Router>
)

export const isNodeEnvTest = () => process.env.NODE_ENV === 'test'
