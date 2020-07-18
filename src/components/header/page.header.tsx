import React from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { TStyle } from "../../shared/table/types";
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import './header.scss'
import { useModalStateValue } from "../../shared/state-handler";


interface IPageHeaderProps {
  name: string,
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
  name
}: IPageHeaderProps) {
  const { dispatch } = useModalStateValue()
  return (
    <Grid>
      <Paper className={classes.root}>
        {name}
        <div
          className="icon-container"
          onClick={() => dispatch({type: 'open', payload: null})}
        >
          <ControlPointIcon style={{fill: 'green'}}/>
        </div>
      </Paper>
    </Grid>
  )
}

export const PageHeader = withStyles(styles)(PageHeaderComponent);