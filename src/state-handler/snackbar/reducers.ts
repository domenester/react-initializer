import { Color } from "@material-ui/lab/Alert"

interface ISnackbarReducer {
  open: boolean,
  severity: Color,
  message: string
}

export default {
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
