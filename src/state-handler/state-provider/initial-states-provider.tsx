import { UserInitialState } from '../user'
import { SnackbarInitialState } from '../snackbar'

export default {
  ...UserInitialState(),
  ...SnackbarInitialState()
}