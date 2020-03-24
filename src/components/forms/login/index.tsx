import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { AuthService } from '../../../services'
import { useStateValue } from '../../../state-handler'
import { useHistory } from 'react-router-dom'

export default function LoginForm () {

  const authService = AuthService()
  const history = useHistory();
  const { dispatch } = useStateValue();
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const initialErrorMessages: { [key: string]: any } = {}
  const [ errorMessages, setErrorMessages ] = useState(initialErrorMessages)

  const validateEmail = ()=>  {
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    if (regex.test(email)) {
      return setErrorMessages({})
    }
    setErrorMessages({
      errorMessages: {
        email: 'Email inválido'
      }
    })
  }

  const getLabel = (fieldName: string, labelValue: string) => {
    if (Object.keys(errorMessages).length) {
      return errorMessages[fieldName]
    }
    return labelValue
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userLogged = await authService.login({email, password})
    if (userLogged) {
      dispatch({ type: 'setUser', payload: userLogged })
      history.push('/')
      window.location.reload()
    }
  }

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <TextField
        fullWidth
        error={!!errorMessages && !!errorMessages.email}
        id='outlined-email-input'
        label={getLabel('email', 'Email')}
        type='email'
        name='email'
        autoComplete='email'
        margin='normal'
        variant='outlined'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={() => email && validateEmail()}
      />
      <TextField
        fullWidth
        id='outlined-password-input'
        label='Password'
        type='password'
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className='center'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
        >
          Entrar
        </Button>
      </div>
    </form>
  )
}
