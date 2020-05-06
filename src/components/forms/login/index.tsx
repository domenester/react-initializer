import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Link } from '@material-ui/core'
import { useAuthServiceValue } from '../../../services'
import { useStateValue } from '../../../shared/state-handler'
import { useHistory } from 'react-router-dom'
import { isNodeEnvTest } from '../../../utils'
import EmailInput from '../input/email.input'
import PasswordInput from '../input/password.input'

export default function LoginForm () {

  const { login } = useAuthServiceValue()
  const history = useHistory()
  const { dispatch } = useStateValue()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const formatSnackBarMessages = () => {
    return Object.keys(errors)
      .map(key => errors[key].message).join(', ')
  }

  const showAlert = () => dispatch({
    type: 'setSnackbarOpen',
    payload: {
      open: true,
      message: formatSnackBarMessages(),
      severity: 'error'
    }
  })

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return showAlert()
    }

    const response = await login(email, password)
    if (response) {
      dispatch({ type: 'setUser', payload: response.user })
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
      <EmailInput
        errors={errors}
        register={register}
        setEmail={setEmail}
        defaultValue={email}
      />
      <PasswordInput
        errors={errors}
        register={register}
        setPassword={setPassword}
        defaultValue={email}
      />
      <div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          data-testid={'buttonSubmit'}
        >
          Entrar
        </Button>
      </div>
      <Link
        component="button"
        type="button"
        onClick={() => history.push('/forgot-password')}
      >
        Forgot Password?
      </Link>
    </form>
  )
}
