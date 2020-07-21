import React from "react"
import { useSnackBarStateValue } from "../state-handler"
import { snackbarConfig } from "../config"
import { Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'

export const Alert = () => {
  const { state, dispatch } = useSnackBarStateValue()
  const { open, message, severity } = state
  const { anchorOrigin, autoHideDuration } = snackbarConfig()
  const handleSnackbarClose = () => dispatch(
    { type: 'hide', payload: null}
  )

  return (
    <Snackbar
      key={`${anchorOrigin.vertical},${anchorOrigin.horizontal}`}
      anchorOrigin={anchorOrigin}
      onClose={handleSnackbarClose}
      open={open}
      autoHideDuration={autoHideDuration}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}