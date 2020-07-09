import React from 'react'
import { UserList } from '../../components'
import { UserServiceProvider } from '../../services'
import { UserHandleForm } from '../../components/forms'
import { Grid } from '@material-ui/core'
import { PageHeader } from '../../components/header'

export const UserRoute = () => (
  <div className='user-content'>
    <PageHeader name='Usuários'/>
    <UserServiceProvider>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
      >
        <Grid container item xs={6} >
          <UserHandleForm/>
        </Grid>
        <Grid container item xs={6} >
          <UserList/>
        </Grid>
      </Grid>
    </UserServiceProvider>
  </div>
)