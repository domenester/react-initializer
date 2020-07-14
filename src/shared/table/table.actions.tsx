import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TRow } from './table';

interface ITableActionsMenuProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  editable: boolean;
  row?: TRow;
  handleEdit: Function
}

export function TableActionsMenu (props: ITableActionsMenuProps) {
  const {
    editable,
    row,
    handleEdit,
    handleClose,
    open,
    anchorEl,
    id
  } = props

  const handleEditAndClose = () => {
    handleEdit(row)
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
        editable && 
        <MenuItem onClick={handleEditAndClose}>
          <EditIcon style={{fill: 'green'}}/> Editar
        </MenuItem>
      }
      <MenuItem onClick={() => {}}>
        <DeleteIcon style={{fill: 'red'}}/> Remover
      </MenuItem>
    </Menu>
  )
}
