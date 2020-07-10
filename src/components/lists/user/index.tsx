import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useUserServiceValue } from '../../../services';
import { CommonTable } from '../../../shared/table'
import { TStyle } from '../../../shared/table/types';
import { useUserListStateValue } from '../../../shared/state-handler';

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%'
  }
});

function UserListComponent (props: any) {
  const { list } = useUserServiceValue()
  const { dispatch, state } = useUserListStateValue()
  const {
    page,
    rowsPerPage,
    rows,
    count,
    take,
    skip
  } = state

  async function fetch (take: number, skip: number) {
    const data: any = await list(take, skip)
    dispatch({ type: 'setRows', payload: [...rows, ...data.rows] })
    dispatch({ type: 'setCount', payload: data.count })
  }

  const handleChangePage = async (event: any, newPage: number) => {
    let newSkip = newPage > page ? skip + rowsPerPage : skip - rowsPerPage
    dispatch({type: 'setPage', payload: newPage})
    dispatch({type: 'setSkip', payload: newSkip})
    if (rows.length < count) {
      await fetch(take, newSkip)
    }
  };

  const handleChangeRowsPerPage = (event: any) => {
    dispatch({ type: 'setPage', payload: 0 })
    dispatch({ type: 'setRowsPerPage', payload: +event.target.value })
  };

  const { classes } = props;

  useEffect( () => {
    async function runAsync() {
      await fetch(take, 0)
    }
    runAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CommonTable
      headers={['Nome', 'Email']}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      count={count}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      classes={classes}
    ></CommonTable>
  );
}

export const UserList = withStyles(styles)(UserListComponent);
