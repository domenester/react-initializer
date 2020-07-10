import { useReducer } from 'react';
import ProviderGenerator from '../../../provider-generator';
import UserListInitialState from './initial-state'
import { UserListReducers } from './reducers'
import { reducerHandler } from '../../state-provider/reducer-handler';
import { IContextProps } from '../../interfaces';

const reducer = (state: any, action: {
  type: string, payload: any
}) => {
  return reducerHandler(state, action, UserListReducers)
};

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducer, UserListInitialState());
  return { state, dispatch };
}

const providerGenerated = ProviderGenerator(
  buildValue,
  {} as IContextProps
)

const UserListStateProvider = providerGenerated.provider;
const UserListContext = providerGenerated.context;
const useUserListStateValue = providerGenerated.useValue;

export {
  UserListStateProvider,
  UserListContext,
  useUserListStateValue,
}