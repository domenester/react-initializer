import React from 'react'
import { UserList } from '../../components'
import { UserServiceProvider } from '../../services'

export const UserRoute = () => (
  <div className='user-content'>
    <UserServiceProvider>
      <UserList/>
    </UserServiceProvider>
  </div>
)