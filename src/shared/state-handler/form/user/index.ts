import UserFormInitialState from './initial-state'
import { UserFormReducers } from './reducers'
import { DependenciesGenerator } from '../../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  UserFormReducers,
  UserFormInitialState
)

export const UserFormStateProvider = stateProvider
export const UserFormContext = context
export const useUserFormStateValue = stateValue
