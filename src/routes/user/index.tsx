import React from 'react'
import { UserList } from '../../components'
import { UserServiceProvider } from '../../services'
import { UserHandleForm } from '../../components/forms'
import { Grid } from '@material-ui/core'
import { PageHeader } from '../../components/header'
import { Modal } from '../../shared/modal'
import { useUserFormStateValue, UserFormStateProvider } from '../../shared/state-handler'

export const Route = () => {
  const { dispatch } = useUserFormStateValue()
  return (
    <div className='user-content'>
      <PageHeader
        name='Usuários'
        onModalOpen={ () => dispatch({type: 'resetState', payload: null}) }
      />
      <UserServiceProvider>
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
      </UserServiceProvider>
    </div>
  )
}

export const UserRoute = () => (
  <UserFormStateProvider>
    <Route/>
  </UserFormStateProvider>
)