import React from 'react'
import { render } from '@testing-library/react'
import { StateProvider } from '../shared/state-handler'
import { Router } from 'react-router-dom'
import { customHistory } from '../services'

export const renderWithRouterAndContext = (
  component: JSX.Element
) => {
  return {
    ...render(
      <StateProvider>
        <Router history={customHistory}> 
          {component}
        </Router>
      </StateProvider>
    )
  }
}

export const isNodeEnvTest = () => process.env.NODE_ENV === 'test'
