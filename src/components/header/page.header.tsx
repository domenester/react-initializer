import React from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { TStyle } from "../../shared/table/types";


interface IPageHeaderProps {
  name: string,
  classes: any
} 

const styles: TStyle = (theme: any) => ({
  root: {
    padding: '10px',
    fontSize: '24px',
    fontWeight: 'bold'
  }
});

function PageHeaderComponent (props: IPageHeaderProps) {
  const { classes } = props
  return (
    <Grid>
      <Paper className={classes.root}>
        {props.name}
      </Paper>
    </Grid>
  )
}

export const PageHeader = withStyles(styles)(PageHeaderComponent);