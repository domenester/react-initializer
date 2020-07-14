import { withStyles, createStyles, TableCell, Theme } from "@material-ui/core";
import { orange   } from "@material-ui/core/colors";

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.getContrastText(orange[500]),
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
