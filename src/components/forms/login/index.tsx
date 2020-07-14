import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Link, Grid } from '@material-ui/core'
import { useAuthServiceValue, useAlertServiceValue } from '../../../services'
import {
  useUserStateValue
} from '../../../shared/state-handler'
import { useHistory } from 'react-router-dom'
import { isNodeEnvTest } from '../../../utils'
import EmailInput from '../input/email.input'
import PasswordInput from '../input/password.input'

export default function LoginForm () {

  const { login } = useAuthServiceValue()
  const history = useHistory()
  const userState = useUserStateValue()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { multipleErrors } = useAlertServiceValue()

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const response = await login(email, password)
    if (response) {
      userState.dispatch({ type: 'setUser', payload: response.user })
      history.push('/')
      /**
       * TODO: Find a way to app load home component to exclude this page refresh
       */
      !isNodeEnvTest() && window.location.reload()
    }
  }

  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='center'>
      <Grid container spacing={1}>
        <Grid container item xs={12} >
          <EmailInput
            errors={errors}
            register={register}
            setEmail={setEmail}
            defaultValue={email}
          />
        </Grid>
        <Grid container item xs={12} >
          <PasswordInput
            errors={errors}
            register={register}
            setPassword={setPassword}
            defaultValue={password}
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
            Entrar
          </Button>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Link
            className="fullWidth"
            component="button"
            type="button"
            onClick={() => history.push('/forgot-password')}
          >
            Forgot Password?
          </Link>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Link
            className="fullWidth"
            component="button"
            type="button"
            onClick={() => history.push('/register')}
          >
            Register
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}
