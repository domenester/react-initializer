import React from "react"
import { Paper, Grid, withStyles } from "@material-ui/core"
import { TextFilter } from "./text.filter"
import { DateRangeFilter } from "./date-range.filter"
import { SearchFilterButton } from "./search.button"
import { TFetch } from "../../../hooks"
import { TStyle } from "../../table/types"

const styles: TStyle = (theme: any) => ({
  paper: {
    width: '100%',
    padding: '10px',
    marginTop: '10px'
  }
});

export interface IFilterProps {
  fetch: TFetch
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>
}

interface IFiltersProps extends IFilterProps {
  withSearch: boolean
  withRange: boolean
  classes: any
}

export const FiltersComponent = ({
  fetch,
  dispatch,
  withSearch,
  withRange,
  classes
}: IFiltersProps) => {
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        { withSearch && 
          <Grid container item xs={12} md={6} sm={12}>
            <TextFilter
              fetch={fetch}
              dispatch={dispatch}
            />
          </Grid>
        }
        { withRange && 
          <Grid container item xs={12} md={6} sm={12}>
            <DateRangeFilter
              fetch={fetch}
              dispatch={dispatch}
            />
          </Grid>
        }
        <Grid container item xs={12}>
          <SearchFilterButton
            fetch={fetch}
            dispatch={dispatch}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export const Filters = withStyles(styles)(FiltersComponent);