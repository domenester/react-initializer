import UserInitialState from './initial-state'
import { UserReducers } from './reducers'
import { DependenciesGenerator } from '../state-provider/dependencies-generator';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  UserReducers,
  UserInitialState
)

export const UserStateProvider = stateProvider
export const UserContext = context
export const useUserStateValue = stateValue
