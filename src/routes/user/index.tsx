import React from 'react'
import { UserList } from '../../components'
import { UserServiceProvider } from '../../services'
import { UserHandleForm } from '../../components/forms'
import { Grid } from '@material-ui/core'
import { PageHeader } from '../../components/header'
import { Modal } from '../../shared/modal'
import { UserFormStateProvider } from '../../shared/state-handler'

export const UserRoute = () => {
  return (
    <div className='user-content'>
      <PageHeader name='Usuários' />
      <UserServiceProvider>
        <UserFormStateProvider>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
          >
            <Grid container item>
              <Modal
                open={false}
                title={'Usuário'}
              >
                <UserHandleForm/>
              </Modal>
              <UserList/>
            </Grid>
          </Grid>
        </UserFormStateProvider>
      </UserServiceProvider>
    </div>
  )
}