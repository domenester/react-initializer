import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import { ISideBarListItem } from './interfaces'

const listItems: Array<ISideBarListItem> = [
  {
    text: 'User',
    icon: <PersonIcon />,
    link: '/user'
  }
]

export default listItems