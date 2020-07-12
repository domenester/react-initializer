import SnackbarInitialState from './initial-state'
import { SnackbarReducers } from './reducers'
import { DependenciesGenerator } from '../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  SnackbarReducers,
  SnackbarInitialState
)

export const SnackBarStateProvider = stateProvider
export const SnackBarContext = context
export const useSnackBarStateValue = stateValue
