import React, { useState } from 'react';
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
import DehazeIcon from '@material-ui/icons/Dehaze'
import { TableActionsMenu } from './table.actions';

const styles = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3),
    overflow: 'auto'
  }
});

export type TRow = {
  id: number,
  [key: string]: number | string | Date
}

interface ITableProps {
  headers: { [key: string]: string },
  rows: TRow [],
  page: number,
  rowsPerPage: number,
  count: number,
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void,
  handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  classes: any,
  editable: boolean,
  handleEdit: Function,
  handleDelete?: Function,
  handleRestore?: Function
}

function CommonTableComponent ({
  headers,
  rows,
  page,
  rowsPerPage,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  classes,
  editable,
  handleEdit,
  handleDelete,
  handleRestore
}: ITableProps) {

  const initialPopoverElementMap: {[key: string]: any} = {}
  const [ popoverElementMap, setPopoverElementMap ] = useState(initialPopoverElementMap)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const buildHeaderCell = () => [
    ...Object.keys(headers).map( name => <StyledTableCell key={name}>{headers[name]}</StyledTableCell> ),
    <StyledTableCell
      key={'acions-header'}
      style={{textAlign: 'center'}}
    >
      Ações
    </StyledTableCell>
  ]

  const buildRowCell = (row: TRow, index: number) => ([
    ...Object.keys(headers)
    .filter(key => key !== 'id')
    .map(key => 
      <StyledTableCell
        key={key}
        data-testid={`${key}Cell`}
      >
        {row[key] && row[key]}
      </StyledTableCell>
    ),
    buildActionCell(row, index)
  ])

  const buildActionCell = (row: TRow, index: number) => {
    const id = row.id
    const popoverId = `popover-${id}`

    const handleClick = (popoverId: string, event: React.MouseEvent<HTMLElement>) => {
      setPopoverElementMap({
        ...popoverElementMap,
        [popoverId]: event.currentTarget
      })
    };

    const handleClose = () => setPopoverElementMap({
      ...popoverElementMap,
      [popoverId]: null
    })

    const idName = (!!popoverElementMap[popoverId] && popoverId) || undefined

    return (
      <StyledTableCell
        key={'acions-row'}
        style={{textAlign: 'center', cursor: 'pointer'}}
      >
        <div
          aria-controls={idName}
          aria-haspopup="true"
          data-testid={`table-action-trigger-${index}`}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(popoverId, event)}
        >
          <DehazeIcon/>
        </div>
        <TableActionsMenu
          id={idName}
          open={!!popoverElementMap[popoverId]}
          anchorEl={popoverElementMap[popoverId]}  
          handleClose={handleClose}
          row={row}
          editable={editable}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleRestore={handleRestore}
        />
      </StyledTableCell>
    )
  }

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TRow, index) => (
              <StyledTableRow key={row.id} role={'table-row'}>
                { buildRowCell(row, index) }
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={Object.keys(headers).length + 1} />
              </TableRow>
            )}
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={Object.keys(headers).length + 1}
                  style={{textAlign: 'center'}}
                >
                  Nenhum dado encontrado
                </TableCell>
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
