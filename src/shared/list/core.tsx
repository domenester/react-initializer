import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CommonTable, TRow } from '../../shared/table'
import { TStyle } from '../../shared/table/types';
import { useUserListStateValue } from '../../shared/state-handler';

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%'
  }
});

interface IListComponent {
  requestList: Function,
  handleEdit: (row: TRow) => void,
  headers: { [key: string]: string },
  editable: boolean,
  classes: any
}

function ListComponent (props: IListComponent) {
  const {
    requestList,
    handleEdit,
    headers,
    editable,
    classes
  } = props

  const { dispatch, state } = useUserListStateValue()
  const {
    page,
    rowsPerPage,
    rows,
    count,
    take,
    skip,
    pageHistory,
    filter
  } = state

  /**
   * TODO: Adjust filter to work correctally
   */
  async function fetch (take: number, skip: number, accumulate: boolean = true) {
    if (filter) {
      accumulate = false
    }
    const data: any = await requestList(take, skip, filter)
    const newRows = [ ...( (accumulate && rows) || []), ...data.rows ]
    dispatch({ type: 'setRows', payload: newRows })
    dispatch({ type: 'setCount', payload: data.count })
  }

  const handleChangePage = async (event: any, newPage: number) => {
    let newSkip = newPage > page ? skip + rowsPerPage : skip - rowsPerPage
    dispatch({type: 'setPage', payload: newPage})
    dispatch({type: 'setSkip', payload: newSkip})
    if (!pageHistory.some((index: number) => index === newPage)) {
      await fetch(take, newSkip)
    }
    dispatch({type: 'pushPageHistory', payload: newPage})
  };

  const handleChangeRowsPerPage = async (event: any) => {
    const value = +event.target.value
    if (value > rows.length) {
      dispatch({ type: 'setRows', payload: [] })
      await fetch(value, 0, false)
    }
    dispatch({ type: 'setPage', payload: 0 })
    dispatch({ type: 'setRowsPerPage', payload: value })
  };

  useEffect( () => {
    async function runAsync() {
      await fetch(take, 0)
    }
    runAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

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
    ></CommonTable>
  );
}

export const List = withStyles(styles)(ListComponent);
