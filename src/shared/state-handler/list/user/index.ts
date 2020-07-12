import UserListInitialState from './initial-state'
import { UserListReducers } from './reducers'
import { DependenciesGenerator } from '../../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  UserListReducers,
  UserListInitialState
)

export const UserListStateProvider = stateProvider
export const UserListContext = context
export const useUserListStateValue = stateValue
