import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActionsWrapped from './pagination-actions';
import { TableHead } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from './'

const styles = (theme: any) => ({
  root: {
    width: '600px',
    marginTop: theme.spacing(3),
  }
});

type TRow = { [key: string]: number | string | Date }

interface TableProps {
  headers: string [],
  rows: TRow [],
  page: number,
  rowsPerPage: number,
  count: number,
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void,
  handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  classes: any
}

function CommonTableComponent (props: TableProps) {

  const {
    headers,
    rows,
    page,
    rowsPerPage,
    count,
    handleChangePage,
    handleChangeRowsPerPage,
    classes
  } = props

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const buildHeaderCell = () => headers.map(
    name => <StyledTableCell key={name}> { name } </StyledTableCell>
  )

  const buildRowCell = (row: TRow) => Object.keys(row)
    .filter(key => key !== 'id')
    .map(key => <StyledTableCell key={key}> {row[key]} </StyledTableCell>)

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { buildHeaderCell() }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TRow) => (
              <StyledTableRow key={row.id as string}>
                { buildRowCell(row) }
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage={'Linhas por Página'}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}

export const CommonTable = withStyles(styles)(CommonTableComponent);
