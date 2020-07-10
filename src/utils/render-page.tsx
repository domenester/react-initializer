import React from 'react'
import { useSnackBarStateValue } from "../shared/state-handler";
import { snackbarConfig } from "../shared/config";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertServiceProvider } from '../services';

export default ( Component: () => JSX.Element ) => {
  const { state, dispatch } = useSnackBarStateValue();
  const { snackbar: { open, message, severity } } = state
  const { anchorOrigin, autoHideDuration } = snackbarConfig

  const handleSnackbarClose = () => dispatch(
    { type: 'setSnackbarOpen', payload: { open: false }}
  )

  return (
    <div className="content">
      <Snackbar
        key={`${anchorOrigin.vertical},${anchorOrigin.horizontal}`}
        anchorOrigin={anchorOrigin}
        onClose={handleSnackbarClose}
        open={open}
        autoHideDuration={autoHideDuration}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
      <AlertServiceProvider>
        <Component />
      </AlertServiceProvider>
    </div>
  )
}