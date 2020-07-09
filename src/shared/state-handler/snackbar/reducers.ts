import { Color } from "@material-ui/lab/Alert"
import { TReducers } from "../interfaces"

interface ISnackbarReducer {
  open: boolean,
  severity: Color,
  message: string
}

export const SnackbarReducers: TReducers = {
  setSnackbarOpen: (state: any, payload: ISnackbarReducer) => {
    return {
      ...state,
      snackbar: {
        ...state.snackbar,
        ...payload
      }
    }
  }
}
