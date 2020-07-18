import ModalInitialState from './initial-state'
import { ModalReducers } from './reducers'
import { DependenciesGenerator } from '../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  ModalReducers,
  ModalInitialState
)

export const ModalStateProvider = stateProvider
export const ModalContext = context
export const useModalStateValue = stateValue
