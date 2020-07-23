import React from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { TStyle } from "../../shared/table/types";
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import './header.scss'
import { useModalStateValue } from "../../shared/state-handler";


interface IPageHeaderProps {
  name: string,
  onModalOpen?: () => any
  classes: any
} 

const styles: TStyle = (theme: any) => ({
  root: {
    padding: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex'
  }
});

function PageHeaderComponent ({
  classes,
  onModalOpen,
  name
}: IPageHeaderProps) {
  const { dispatch } = useModalStateValue()
  return (
    <Grid>
      <Paper className={classes.root}>
        {name}
        <div
          data-testid="open-add-modal"
          className="icon-container"
          onClick={() => {
            onModalOpen && onModalOpen()
            dispatch({type: 'open', payload: null})
          }}
        >
          <ControlPointIcon style={{fill: 'green'}}/>
        </div>
      </Paper>
    </Grid>
  )
}

export const PageHeader = withStyles(styles)(PageHeaderComponent);