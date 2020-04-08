import React, { createContext, useContext, useReducer } from 'react';
import reducers from './reducer-provider'
import initialStates from './initial-states-provider'

export type TDispatch =  ({ type, payload }: { type:string, payload: any }) => void;

interface IContextProps {
  state: any;
  dispatch: TDispatch;
}

const StateContext = createContext({} as IContextProps);

const StateProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer(reducers, initialStates);

  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
};

const useStateValue = () => useContext(StateContext);

export {
  StateContext,
  StateProvider,
  useStateValue
};
