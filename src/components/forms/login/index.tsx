import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'
import { AuthService } from '../../../services'
import { useStateValue } from '../../../state-handler'
import { useHistory } from 'react-router-dom'
import { isNodeEnvTest } from '../../../utils'

export default function LoginForm () {

  const authService = AuthService()
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

    const userLogged = await authService.login({email, password})
    if (userLogged) {
      dispatch({ type: 'setUser', payload: userLogged })
      history.push('/')
      /**
       * TODO: Find a way to app load home component to exclude this page refresh
       */
      !isNodeEnvTest() && window.location.reload()
    }
  }

  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        error={!!errors.email}
        label={'Email'}
        name='email'
        autoComplete='email'
        margin='normal'
        variant='outlined'
        defaultValue={email}
        helperText={errors.email ? errors.email.message : ''}
        inputProps={{
          ref: register({
            required: 'Campo Obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Email inválido',
            },
          }),
          'data-testid': 'emailInput'
        }}
      />
      <TextField
        fullWidth
        label='Senha'
        error={!!errors.password}
        type='password'
        name='password'
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
        defaultValue={password}
        helperText={errors.password ? errors.password.message : ''}
        onChange={(event) => setPassword(event.target.value)}
        inputProps={{
          ref: register({
            required: 'Campo Obrigatório'
          }),
          'data-testid': 'passwordInput'
        }}
      />
      <div className='center'>
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
    </form>
  )
}
