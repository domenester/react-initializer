import { Button, withStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const ButtonSuccess = withStyles((theme: Theme) => ({
  root: {
    color: green[50],
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    marginLeft: '10px',
    marginRight: '10px'
  },
}))(Button);