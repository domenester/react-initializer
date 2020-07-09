import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../input/email.input'
import { Button, Grid, Paper, withStyles } from '@material-ui/core'
import { useSnackBarStateValue } from '../../../shared/state-handler'
import { useUserServiceValue } from '../../../services'
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

  const { create } = useUserServiceValue()
  const { dispatch } = useSnackBarStateValue()
  const [ name, setName ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const formatSnackBarMessages = () => {
    return Object.keys(errors)
      .map(key => errors[key].message).join(', ')
  }

  const showAlert = (severity = 'error', message?: string) => dispatch({
    type: 'setSnackbarOpen',
    payload: {
      open: true,
      message: message || formatSnackBarMessages(),
      severity
    }
  })

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return showAlert()
    }

    const body = new UserModel( password, email, username, ['owner'] )
    const response = await create(body)
    if (response) {
      showAlert('success', response.message)
    }
  }

  const { handleSubmit, register, errors } = useForm();
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