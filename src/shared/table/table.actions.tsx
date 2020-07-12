import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TRow } from './table';

interface ITableActionsMenuProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose?: () => void;
  editable: boolean;
  row?: TRow;
}

export function TableActionsMenu (props: ITableActionsMenuProps) {
  const { editable } = props
  return (
    <Menu
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
    >
      {
        editable && 
        <MenuItem onClick={() => {}}>
          <EditIcon style={{fill: 'green'}}/> Editar
        </MenuItem>
      }
      <MenuItem onClick={() => {}}>
        <DeleteIcon style={{fill: 'red'}}/> Remover
      </MenuItem>
    </Menu>
  )
}
