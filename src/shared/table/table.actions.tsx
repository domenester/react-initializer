import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import { TRow } from './table';

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
        <MenuItem onClick={() => handleActionAndClose(handleEdit)}>
          <EditIcon style={{fill: 'green'}}/> { labels?.edit || 'Editar' }
        </MenuItem>
      }
      {
        !row.deletedAt &&
        <MenuItem onClick={() => handleActionAndClose(handleDelete)}>
          <DeleteIcon style={{fill: 'red'}}/> { labels?.delete || 'Desabilitar' }
        </MenuItem>
      }
      {
        row.deletedAt &&
        <MenuItem onClick={() => handleActionAndClose(handleRestore)}>
          <RestoreIcon style={{fill: 'green'}}/> { labels?.delete || 'Habilitar' }
        </MenuItem>
      }
      
    </Menu>
  )
}
