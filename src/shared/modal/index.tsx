import React from "react"
import MuiModal, { ModalProps as MuiModalProps } from '@material-ui/core/Modal'
import { Paper, withStyles } from "@material-ui/core"
import { TStyle } from '../table/types'
import { useModalStateValue } from "../state-handler"
import CancelIcon from '@material-ui/icons/Cancel'

interface ModalProps extends MuiModalProps{
  title: string
}

const styles: TStyle = (theme: any) => ({
  modal:{
    top:'10%',
    left:'10%',
    height:'100%',
    maxHeight: 500,
    margin: 'auto',
    overflow: 'auto'
  },
  header: {
    padding: '12px',
    borderBottom: '1px solid darkgrey',
    display: 'flex',
    margin: '10px',
    cursor: 'pointer',
    alignItems: 'center'
  },
  content: {
    padding: 12
  }
});

export const ModalComponent = ({
  style,
  title,
  children,
  onClose,
  classes
}: ModalProps
) => {
  const Classes = (classes as any)
  const { state: { open }, dispatch } = useModalStateValue()

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick')
    dispatch({ type: 'close', payload: null })
  }

  return (
    <MuiModal
      open={open}
      className={Classes.modal}
      style={{ maxWidth: '500px', ...(style && style) }}
      onClose={handleClose}>
      <Paper>
        <h2 className={Classes.header}>
          {title}
          <div
            onClick={handleClose}
            style={{marginLeft: 'auto'}}
          >
            <CancelIcon style={{fill: 'red'}}/>
          </div>
        </h2>
        <div className={Classes.content}>
          {children}
        </div>
      </Paper>
    </MuiModal>
  )
}

export const Modal = withStyles(styles)(ModalComponent);