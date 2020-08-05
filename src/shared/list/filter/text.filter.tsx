import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useUserListStateValue } from '../../state-handler'
import { InputAdornment, IconButton, withStyles, TextField } from '@material-ui/core'
import { TStyle } from '../../table/types'
import { IFilterProps } from './filters'

const styles: TStyle = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3)
  }
});

export const TextFilterComponent = ({
  fetch,
  dispatch
}: IFilterProps) => {
  const [ value, setValue ] = useState('')
  const [ search, setSearch ] = useState(false)
  const { state: { take } } = useUserListStateValue()
  const label = 'Filtro'
  const name = 'filter'

  useEffect(() => {
    if (search) {
      dispatch({ type: 'resetList', payload: null})
      fetch(take, 0, false)
      handleChange('')
      setSearch(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleChange = (value: string) => {
    dispatch({type: 'setFilter', payload: { search: value }})
    setValue(value)
  }

  return (
    <TextField
      onChange={(event) => handleChange(event.target.value)}
      fullWidth
      label={label}
      name={name}
      autoComplete={label}
      margin='normal'
      variant='outlined'
      value={value}
      onKeyUp={async (event) => {
        if (event.key === 'Enter') { setSearch(true) }
      }}
      InputProps={{ startAdornment: (
        <InputAdornment position="start">
          <IconButton
            aria-label="filter"
            onClick={() => setSearch(true)}
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

export const TextFilter = withStyles(styles)(TextFilterComponent);
