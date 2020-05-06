import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../input/email.input'
import { Button, Link } from '@material-ui/core'
import { useStateValue } from '../../../shared/state-handler'
import { useHistory } from 'react-router-dom'
import { usePasswordServiceValue } from '../../../services'

export default function ForgotPasswordForm () {

  const { requestReset } = usePasswordServiceValue()
  const history = useHistory()
  const { dispatch } = useStateValue()
  const [ email, setEmail ] = useState('')

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

    const response = await requestReset(email)
    if (response) {
      showAlert('success', response.message)
      history.push('/login')
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
      <div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          data-testid={'buttonSubmit'}
        >
          Request Password
        </Button>
      </div>
      <Link
        component="button"
        type="button"
        onClick={() => history.push('/login')}
      >
        Go Back
      </Link>
    </form>
  )
}