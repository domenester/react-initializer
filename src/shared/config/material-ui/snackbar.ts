import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { isNodeEnvTest } from "../../../utils";

export const snackbarConfig: () => {
  anchorOrigin: SnackbarOrigin,
  autoHideDuration: number | null;
} = () => ({
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration: isNodeEnvTest() ? 500 : 5000
})
