import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';

const actionsStyles = (theme: any) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

interface ITablePaginationActions extends TablePaginationActionsProps{
  classes: any;
  theme: any;
}

function TablePaginationActions (props: ITablePaginationActions) {
  // const handleFirstPageButtonClick = (event: any) => {
  //   props.onChangePage(event, 0);
  // };

  const handleBackButtonClick = (event: any) => {
    props.onChangePage(event, props.page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    props.onChangePage(event, props.page + 1);
  };

  // const handleLastPageButtonClick = (event: any) => {
  //   props.onChangePage(
  //     event,
  //     Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1),
  //   );
  // };

  const { classes, count, page, rowsPerPage, theme } = props;

    return (
      <div className={classes.root}>
        {/* <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="Primeira página"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton> */}
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="Página Anterior"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Próxima Página"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        {/* <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Última Página"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton> */}
      </div>
    );
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export default TablePaginationActionsWrapped;