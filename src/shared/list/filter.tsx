import React from "react"
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react"
import { useUserListStateValue } from "../state-handler"
import { InputAdornment, IconButton, withStyles, TextField } from "@material-ui/core"
import { TStyle } from "../table/types";

const styles: TStyle = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3)
  }
});

export const ListFilterComponent = (props: any) => {
  const [ value, setValue ] = useState('')
  const { dispatch } = useUserListStateValue()
  const label = 'Filtro'
  const name = 'filter'

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
      onKeyUp={(event) => {
        console.log('event.ctrlKey, event.key: ', event.ctrlKey, event.key)
        if (event.key === 'Enter') {
          dispatch({type: 'setFilter', payload: value})
          setValue('')
        }
      }}
      InputProps={{ startAdornment: (
        <InputAdornment position="start">
          <IconButton
            aria-label="filter"
            onClick={() => dispatch({type: 'setFilter', payload: value})}
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
