import React from 'react'
import { Button } from '@material-ui/core'
import { useUserListStateValue } from '../../state-handler'
import { IFilterProps } from './filters'

export const SearchFilterButton = ({
  fetch, dispatch
}: IFilterProps) => {
  const { state: { take } } = useUserListStateValue()

  const onClick = () => {
    dispatch({ type: 'resetList', payload: null})
    fetch(take, 0, false)
  }

  return (
    <Button
      style={{margin: 'auto'}}
      onClick={onClick}
      variant='contained'
      color='primary'
      size='large'
      data-testid={'buttonFilterSubmit'}
    >
      Procurar
    </Button>
  )
}
