import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import { TRow } from './table';
import { useModalStateValue } from '../state-handler';

interface ITableActionsMenuProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  editable: boolean;
  handleEdit: Function;
  handleDelete?: Function;
  handleRestore?: Function;
  row: TRow;
  labels?: {
    edit: string,
    delete: string
  }
}

export function TableActionsMenu ({
  editable,
  row,
  handleEdit,
  handleDelete,
  handleRestore,
  handleClose,
  open,
  anchorEl,
  id,
  labels
}: ITableActionsMenuProps) {

  const { dispatch } = useModalStateValue()
  const handleActionAndClose = (handleAction: Function | undefined) => {
    handleAction && handleAction(row)
    handleClose()
  }

  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      {
        editable && !row.deletedAt && 
        <MenuItem
          data-testid={'table-action-edit'}
          onClick={() => {
            handleActionAndClose(handleEdit)
            dispatch({type: 'open', payload: null})
          }}
        >
          <EditIcon style={{fill: 'green'}}/> { labels?.edit || 'Editar' }
        </MenuItem>
      }
      {
        !row.deletedAt &&
        <MenuItem
          onClick={() => handleActionAndClose(handleDelete)}
          data-testid={'table-action-disable'}
        >
          <DeleteIcon style={{fill: 'red'}}/> { labels?.delete || 'Desabilitar' }
        </MenuItem>
      }
      {
        row.deletedAt &&
        <MenuItem
          onClick={() => handleActionAndClose(handleRestore)}
          data-testid={'table-action-enable'}
        >
          <RestoreIcon style={{fill: 'green'}}/> { labels?.delete || 'Habilitar' }
        </MenuItem>
      }
      
    </Menu>
  )
}
