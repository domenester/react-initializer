import { SnackbarOrigin } from "@material-ui/core/Snackbar";

export const snackbarConfig: {
  anchorOrigin: SnackbarOrigin,
  autoHideDuration: number | null;
} = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration: 5000
}
