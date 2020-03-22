import React, { Component, ChangeEvent } from 'react'
import { TextField, Button } from '@material-ui/core'

interface IState {
  email: string;
  password: string;
  errorMessages?: {
    [key: string]: string
  }
}

export class LoginForm extends Component {

  state: IState = {
    email: '',
    password: ''
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) {
    return this.setState({ [name]: event.target.value })
  }

  validateEmail() {
    const { email } = this.state
    console.log('email', email)
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    if (regex.test(email)) {
      return this.setState({ errorMessages: null })
    }
    this.setState({
      errorMessages: {
        email: 'Email inválido'
      }
    })
  }

  getLabel(fieldName: string, labelValue: string) {
    const { errorMessages } = this.state
    if (errorMessages) {
      return errorMessages[fieldName]
    }
    return labelValue
  }

  render() {
    const { email, password, errorMessages } = this.state
    return (
      <form>
        <TextField
          fullWidth
          error={errorMessages && !!errorMessages.email}
          id='outlined-email-input'
          label={this.getLabel('email', 'Email')}
          type='email'
          name='email'
          autoComplete='email'
          margin='normal'
          variant='outlined'
          value={email}
          onChange={(event) => this.handleChange(event, 'email')}
          onBlur={() => this.validateEmail()}
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
          onChange={(event) => this.handleChange(event, 'password')}
        />
        <div className='center'>
          <Button 
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
}
