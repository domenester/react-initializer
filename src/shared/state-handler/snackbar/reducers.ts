import { TReducers } from "../interfaces"
import { Color } from "@material-ui/core"

interface ISnackbarReducer {
  open: boolean,
  severity: Color,
  message: string,
  history: string
}

export const SnackbarReducers: TReducers = {
  set: (state: any, payload: ISnackbarReducer) => {
    return {
      ...state,
      ...payload
    }
  },
  show: (state: any, payload: any) => {
    return {
      ...state,
      open: true,
      lastCall: ''
    }
  },
  hide: (state: any, payload: any) => {
    return {
      ...state,
      open: false,
      lastCall: window.location.pathname
    }
  }
}
