import React from 'react';
import { useUserServiceValue, useAlertServiceValue } from '../../../services';
import { TRow } from '../../../shared/table'
import { useUserFormStateValue, useUserListStateValue } from '../../../shared/state-handler';
import { List } from '../../../shared/list'
import { useUserFetch } from '../../../hooks';
import { Filters } from '../../../shared/list/filter';

export const UserList = () => {
  const { list, softeDelete, restore } = useUserServiceValue()

  const userFormDispatch = useUserFormStateValue().dispatch
  const { success } = useAlertServiceValue()
  
  const userListDispatch = useUserListStateValue().dispatch
  const fetch = useUserFetch()

  const handleEdit = (row: TRow) => {
    userFormDispatch({type: 'setFields', payload: {
      id: row.id,
      email: row.email,
      username: row.username,
      name: row.name
    }})
  }

  const handleDelete = async (row: TRow) => {
    const { message } = await softeDelete(row.email as string)
    if (message) {
      success(message)
    }
  }

  const handleRestore = async (row: TRow) => {
    const { message } = await restore(row.email as string)
    if (message) {
      success(message)
    }
  }

  const headers = { name: 'Nome', username: 'Username', email: 'Email' }

  return (
    <>
      <Filters
        withSearch={true}
        withRange={true}
        fetch={fetch}
        dispatch={userListDispatch}
      />
      <List
        requestList={list}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
        headers={headers}
        editable={true}
      />
    </>
  );
}
