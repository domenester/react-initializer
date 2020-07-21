import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ISideBarListItem } from './interfaces'

const subListItems: Array<ISideBarListItem> = [
  {
    text: 'Logout',
    icon: <ExitToAppIcon />,
    link: '/logout',
    dataTestId: 'sidebar-logout',
    isLogout: true
  }
]

export default subListItems
