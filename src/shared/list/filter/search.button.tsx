import React from 'react'
import { Button } from '@material-ui/core'
import { useUserListStateValue } from '../../state-handler'
import { TFetch } from '../../../hooks'

interface SearchFilterButtonProps {
  fetch: TFetch
}

export const SearchFilterButton = ({
  fetch
}: SearchFilterButtonProps) => {
  const { state: { take } } = useUserListStateValue()

  const onClick = () => {
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
