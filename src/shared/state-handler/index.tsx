import { UserReducers } from './user'
import { SnackbarReducers } from './snackbar'

export default {
  ...UserReducers,
  ...SnackbarReducers
}

export * from './state-provider'