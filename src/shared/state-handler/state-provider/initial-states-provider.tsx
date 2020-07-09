import { UserInitialState } from '../user'
import { SnackbarInitialState } from '../snackbar'
import { UserListInitialState } from '../list'

export default {
  ...UserInitialState(),
  ...SnackbarInitialState(),
  ...UserListInitialState()
}