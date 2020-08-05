import React, { useState } from "react"
import { withStyles, Grid } from "@material-ui/core"
import { TStyle } from '../../table/types'
import { DateFilter } from "./date.filter";
import { IFilterProps } from "./filters";

const styles: TStyle = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3)
  }
});

export const DateRangeFilterComponent = ({
  dispatch
}: IFilterProps) => {
  const [ from, setFrom ] = useState<Date | null>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ to, setTo ] = useState<Date | null>()
  
  const handleFrom = (from: Date | null) => {
    setFrom(from)
    dispatch({type: 'setFilter', payload: { range: { from }}})
  }

  const handleTo = (to: Date | null) => {
    setTo(to)
    dispatch({type: 'setFilter', payload: { range: { to }}})
  }

  return (
    <>
      <Grid container item xs={12} sm={6} md={6}>
        <DateFilter
          label={"De"}
          setDate={handleFrom}
        />
      </Grid>
      <Grid container item xs={12} sm={6} md={6}>
        <DateFilter
          label={"Até"}
          setDate={handleTo}
          minDate={from}
        />
      </Grid>
    </>
  )
}

export const DateRangeFilter = withStyles(styles)(DateRangeFilterComponent);
