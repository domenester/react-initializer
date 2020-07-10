import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../input/email.input'
import { Button, Grid, Paper, withStyles } from '@material-ui/core'
import { useUserListStateValue } from '../../../shared/state-handler'
import { useUserServiceValue, useAlertServiceValue } from '../../../services'
import PasswordInput from '../input/password.input'
import TextInput from '../input/text.input'
import { TStyle } from '../../../shared/table/types'
import { UserModel } from '../../../models'

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%',
    padding: '2%',
    marginTop: theme.spacing(3)
  }
});

interface IHandleForm {
  classes: any
}

function UserHandleFormComponent (props: IHandleForm) {

  const userListDispatch = useUserListStateValue().dispatch
  const userListState = useUserListStateValue().state
  const { multipleErrors, success } = useAlertServiceValue()

  const { create, list } = useUserServiceValue()
  const [ name, setName ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  async function fetchUserList () {
    const data: any = await list(userListState.take, 0)
    userListDispatch({ type: 'resetState', payload: null })
    userListDispatch({ type: 'setRows', payload: data.rows || [] })
    userListDispatch({ type: 'setCount', payload: data.count || 0 })
  }

  const { handleSubmit, reset, register, errors } = useForm();

  const onSubmit = async (values: any) => {

    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const body = new UserModel( password, email, username, ['owner'] )
    const response = await create(body)
    if (response) {
      success(response.message)
      await fetchUserList()
      reset()
    }
  }

  const { classes } = props
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} className='center'>
        <Grid container spacing={1}>
          <Grid container item xs={6} >
            <TextInput
              errors={errors}
              register={register}
              setValue={setName}
              defaultValue={name}
              name='name'
              label='Nome'
            />
          </Grid>
          <Grid container item xs={6} >
            <TextInput
              errors={errors}
              register={register}
              setValue={setUsername}
              defaultValue={username}
              name='username'
              label='Username'
            />
          </Grid>
          <Grid container item xs={6} >
            <EmailInput
              errors={errors}
              register={register}
              setEmail={setEmail}
              defaultValue={email}
            />
          </Grid>
          <Grid container item xs={6} >
            <PasswordInput
              errors={errors}
              register={register}
              setPassword={setPassword}
              defaultValue={email}
            />
          </Grid>
          <Grid container item xs={12} justify='center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              data-testid={'buttonSubmit'}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export const UserHandleForm = withStyles(styles)(UserHandleFormComponent);