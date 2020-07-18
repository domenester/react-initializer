import React from 'react'
import { UserList } from '../../components'
import { UserServiceProvider } from '../../services'
import { UserHandleForm } from '../../components/forms'
import { Grid } from '@material-ui/core'
import { PageHeader } from '../../components/header'
import { UserListStateProvider } from '../../shared/state-handler/list'
import { useUserFormStateValue } from '../../shared/state-handler'
import { Modal } from '../../shared/modal'

export const UserRoute = () => {
  const { dispatch } = useUserFormStateValue()
  return (
    <div className='user-content'>
      <PageHeader name='Usuários' />
      <UserServiceProvider>
        <UserListStateProvider>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
            >
              <Grid container item>
                <Modal
                  open={false}
                  onClose={() => dispatch({type: 'resetState', payload: null})}
                  title={'Usuário'}
                >
                  <UserHandleForm/>
                </Modal>
                <UserList/>
              </Grid>
            </Grid>
        </UserListStateProvider>
      </UserServiceProvider>
    </div>
  )
}