import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordInput from '../input/password.input'
import { Button, Link } from '@material-ui/core'
import { useStateValue } from '../../../shared/state-handler'
import { useHistory } from 'react-router-dom'
import { usePasswordServiceValue } from '../../../services'
import * as qs from 'qs'

export default function ResetPasswordForm () {

  const { reset } = usePasswordServiceValue()
  const history = useHistory()
  const { dispatch } = useStateValue()
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

    const email = qs.parse(window.location.search, { ignoreQueryPrefix: true }).email
    const response = await reset(email, password)
    if (response) {
      showAlert('success', response.message)
      history.push('/login')
    }
  }

  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='center'>
      <PasswordInput
        errors={errors}
        register={register}
        setPassword={setPassword}
        defaultValue={password}
      />
      <div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          data-testid={'buttonSubmit'}
        >
          Reset Password
        </Button>
      </div>
      <Link
        component="button"
        type="button"
        onClick={() => history.push('/login')}
      >
        Login
      </Link>
    </form>
  )
}
