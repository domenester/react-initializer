import React from 'react';
import { useUserServiceValue } from '../../../services';
import { TRow } from '../../../shared/table'
import { useUserFormStateValue } from '../../../shared/state-handler';
import { List, ListFilter } from '../../../shared/list';

export const UserList = () => {
  const { list } = useUserServiceValue()

  const userFormDispatch = useUserFormStateValue().dispatch
  const handleEdit = (row: TRow) => {
    userFormDispatch({type: 'setFields', payload: {
      id: row.id,
      email: row.email,
      username: row.username,
      name: row.name
    }})
  }
  const headers = { name: 'Nome', username: 'Username', email: 'Email' }

  return (
    <>
      <ListFilter/>
      <List
        requestList={list}
        handleEdit={handleEdit}
        headers={headers}
        editable={true}
      />
    </>
  );
}
