import React from 'react'
import { render } from '@testing-library/react'
import { GlobalStateProvider } from '../shared/state-handler'
import { Router } from 'react-router-dom'
import { customHistory } from '../services'

export const renderWithRouterAndContext = (
  component: JSX.Element
) => {
  return {
    ...render(
      <GlobalStateProvider>
        <Router history={customHistory}> 
          {component}
        </Router>
      </GlobalStateProvider>
    )
  }
}

export const renderWithRouterAndContextRaw = (
  component: JSX.Element
) => (
  <GlobalStateProvider>
    <Router history={customHistory}> 
      {component}
    </Router>
  </GlobalStateProvider>
)

export const isNodeEnvTest = () => process.env.NODE_ENV === 'test'
