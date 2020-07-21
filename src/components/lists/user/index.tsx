import React from 'react';
import { useUserServiceValue, useAlertServiceValue } from '../../../services';
import { TRow } from '../../../shared/table'
import { useUserFormStateValue } from '../../../shared/state-handler';
import { List, ListFilter } from '../../../shared/list'

export const UserList = () => {
  const { list, softeDelete, restore } = useUserServiceValue()

  const userFormDispatch = useUserFormStateValue().dispatch

  const { success } = useAlertServiceValue()

  const handleEdit = (row: TRow) => {
    userFormDispatch({type: 'setFields', payload: {
      id: row.id,
      email: row.email,
      username: row.username,
      name: row.name
    }})
  }

  const handleDelete = async (row: TRow) => {
    const { message } = await softeDelete(row.email)
    if (message) {
      success(message)
    }
  }

  const handleRestore = async (row: TRow) => {
    const { message } = await restore(row.email)
    if (message) {
      success(message)
    }
  }

  const headers = { name: 'Nome', username: 'Username', email: 'Email' }

  return (
    <>
      <ListFilter/>
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
