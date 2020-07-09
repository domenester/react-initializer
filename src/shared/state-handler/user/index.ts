import { useReducer } from 'react';
import ProviderGenerator from '../../provider-generator';
import UserInitialState from './initial-state'
import { UserReducers } from './reducers'
import { reducerHandler } from '../state-provider/reducer-handler';
import { IContextProps } from '../interfaces';

const reducer = (state: any, action: {
  type: string, payload: any
}) => {
  return reducerHandler(state, action, UserReducers)
};

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducer, UserInitialState());
  return { state, dispatch };
}

const providerGenerated = ProviderGenerator(
  buildValue,
  {} as IContextProps
)

const UserStateProvider = providerGenerated.provider;
const UserContext = providerGenerated.context;
const useUserStateValue = providerGenerated.useValue;

export {
  UserStateProvider,
  UserContext,
  useUserStateValue,
}