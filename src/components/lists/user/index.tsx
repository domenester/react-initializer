import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useUserServiceValue } from '../../../services';
import { CommonTable } from '../../../shared/table'
import { TStyle } from '../../../shared/table/types';

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%'
  }
});

function UserListComponent (props: any) {
  const { list } = useUserServiceValue()

  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(5)
  const [ rows, setRows ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ take ] = useState(rowsPerPage);
  const [ skip, setSkip ] = useState(0);

  async function fetch (take: number, skip: number) {
    const data: any = await list(take, skip)
    setRows([...rows, ...data.rows] as any)
    setCount(data.count)
  }

  const handleChangePage = async (event: any, newPage: number) => {
    let newSkip = newPage > page ? skip + rowsPerPage : skip - rowsPerPage
    setPage(newPage)
    setSkip(newSkip)
    if (rows.length < count) {
      await fetch(take, newSkip)
    }
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0)
    setRowsPerPage(+event.target.value)
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
