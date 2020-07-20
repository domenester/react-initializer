import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { CommonTable, TRow } from '../../shared/table'
import { TStyle } from '../../shared/table/types'
import { useUserListStateValue } from '../../shared/state-handler'
import { useUserFetch } from '../../hooks';

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%'
  }
});

interface IListComponent {
  requestList: Function,
  handleEdit: (row: TRow) => void,
  handleDelete: (row: TRow) => void,
  handleRestore: (row: TRow) => void,
  headers: { [key: string]: string },
  editable: boolean,
  classes: any
}

function ListComponent ({
  handleEdit,
  handleDelete,
  handleRestore,
  headers,
  editable,
  classes
}: IListComponent) {

  const { dispatch, state } = useUserListStateValue()
  const {
    page,
    rowsPerPage,
    rows,
    count,
    take,
    skip,
    pageHistory
  } = state

  const fetch = useUserFetch()

  const handleChangePage = async (event: any, newPage: number) => {
    let newSkip = newPage > page ? skip + rowsPerPage : skip - rowsPerPage
    dispatch({type: 'setPage', payload: newPage})
    dispatch({type: 'setSkip', payload: newSkip})
    if (!pageHistory.some((index: number) => index === newPage)) {
      await fetch(take, newSkip)
    }
  };

  const handleChangeRowsPerPage = async (event: any) => {
    const value = +event.target.value
    dispatch({ type: 'setRowsPerPage', payload: value })
    if (value > rows.length) {
      dispatch({ type: 'setRows', payload: [] })
      await fetch(value, 0, false)
    }
  };

  const handleDeleteAndFecth = async (row: TRow) => {
    await handleDelete(row)
    dispatch({ type: 'resetState', payload: null })
    await fetch(take, 0, false)
  }

  const handleRestoreAndFetch = async (row: TRow) => {
    await handleRestore(row)
    dispatch({ type: 'resetState', payload: null })
    await fetch(take, 0, false)
  }

  useEffect( () => {
    async function runAsync() {
      await fetch(take, 0)
    }
    runAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CommonTable
      headers={headers}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      count={count}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      classes={classes}
      editable={!!editable}
      handleEdit={handleEdit}
      handleDelete={handleDeleteAndFecth}
      handleRestore={handleRestoreAndFetch}
    ></CommonTable>
  );
}

export const List = withStyles(styles)(ListComponent);
