import { useReducer } from 'react';
import ProviderGenerator from '../../provider-generator';
import { reducerHandler } from '../state-provider/reducer-handler';
import { IContextProps } from '../interfaces';
import { TReducers } from '../interfaces';

export const DependenciesGenerator = (
  reducers: TReducers,
  initialState: () => any
) => {

  const reducer = (state: any, action: {
    type: string, payload: any
  }) => {
    return reducerHandler(state, action, reducers)
  };
  
  const buildValue = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(reducer, initialState());
    return { state, dispatch };
  }
  
  const providerGenerated = ProviderGenerator(
    buildValue,
    {} as IContextProps
  )
  
  const stateProvider = providerGenerated.provider;
  const context = providerGenerated.context;
  const stateValue = providerGenerated.useValue;
  
  return {
    stateProvider,
    context,
    stateValue
  }
}