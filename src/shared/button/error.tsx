import { Button, withStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const ButtonError = withStyles((theme: Theme) => ({
  root: {
    color: red[50],
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
    marginLeft: '10px',
    marginRight: '10px'
  },
}))(Button);