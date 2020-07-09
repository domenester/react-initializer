import { useReducer } from 'react';
import ProviderGenerator from '../../provider-generator';
import SnackbarInitialState from './initial-state'
import { SnackbarReducers } from './reducers'
import { reducerHandler } from '../state-provider/reducer-handler';
import { IContextProps } from '../interfaces';

const reducer = (state: any, action: {
  type: string, payload: any
}) => {
  return reducerHandler(state, action, SnackbarReducers)
};

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducer, SnackbarInitialState());
  return { state, dispatch };
}

const providerGenerated = ProviderGenerator(
  buildValue,
  {} as IContextProps
)

const SnackBarStateProvider = providerGenerated.provider;
const SnackBarContext = providerGenerated.context;
const useSnackBarStateValue = providerGenerated.useValue;

export {
  SnackBarStateProvider,
  SnackBarContext,
  useSnackBarStateValue,
}