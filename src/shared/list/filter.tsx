import React, { useEffect } from "react"
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react"
import { useUserListStateValue } from "../state-handler"
import { InputAdornment, IconButton, withStyles, TextField } from "@material-ui/core"
import { TStyle } from '../table/types'
import { useUserFetch, usePrevious } from "../../hooks"

const styles: TStyle = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3)
  }
});

export const ListFilterComponent = (props: any) => {
  const [ value, setValue ] = useState('')
  const { state: { filter, take }, dispatch } = useUserListStateValue()
  const prevFilter = usePrevious(filter)
  const fetch = useUserFetch()
  const label = 'Filtro'
  const name = 'filter'

  useEffect(() => {
    if (filter !== prevFilter) {
      fetch(take, 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const dispatchAndResetValue = async (value: string) => {
    if (value !== filter) {
      dispatch({type: 'resetState', payload: null})
      dispatch({type: 'setFilter', payload: value})
    }
    setValue('')
  }

  return (
    <TextField
      onChange={(event) => setValue(event.target.value)}
      fullWidth
      label={label}
      name={name}
      autoComplete={label}
      margin='normal'
      variant='outlined'
      value={value}
      onKeyUp={async (event) => {
        if (event.key === 'Enter') { await dispatchAndResetValue(value) }
      }}
      InputProps={{ startAdornment: (
        <InputAdornment position="start">
          <IconButton
            aria-label="filter"
            onClick={() => dispatchAndResetValue(value)}
            edge="start"
          >
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ) }}
      inputProps={{'data-testid': `${name}Input`}}
    />
  )
}

export const ListFilter = withStyles(styles)(ListFilterComponent);
