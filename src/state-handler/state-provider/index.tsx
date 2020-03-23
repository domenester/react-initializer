import React, { Component } from 'react'
import initialStates from './initial-states'
import StateHandlers from '..'
import { TStateHandler } from '../interfaces'

const StateContext = React.createContext({})

class StateProvider extends Component {

  state = initialStates
  stateHandlers: TStateHandler = StateHandlers

  render() {
    const { children } = this.props

    return (
      <StateContext.Provider
        value={{
          dispatch: (type: string, payload: any): void => {
            if (!this.stateHandlers[type]) {
              throw new Error(`Type doesn't exists to dispatch in StateProvider`)
            }
            this.stateHandlers[type](this.setState.bind(this), payload)
          },
          ...this.state
        }}
      >
        {children}
      </StateContext.Provider>
    )
  }
}

export {
  StateProvider,
  StateContext
}