import React, { Component } from 'react'
import {
  Button,
  Form,
  InputOnChangeData,
  SemanticShorthandItem,
  LabelProps
} from 'semantic-ui-react'

interface IState {
  email: string;
  password: string;
  error: SemanticShorthandItem<LabelProps>
}

export class LoginForm extends Component {

  state: IState = {
    email: '',
    password: '',
    error: null
  }

  handleChange(name: string, input: InputOnChangeData) {
    return this.setState({ [name]: input.value })
  }

  validateEmail() {
    const { email } = this.state
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    if (regex.test(email)) {
      return this.setState({ error: null })
    }
    this.setState({
      error: {
        content: 'Insira um email válido',
        pointing: 'below',
      }
    })
  }

  render() {
    const { email, password, error } = this.state
    return (
      <Form>
        <Form.Input
          required
          label='Email'
          value={email}
          placeholder='Digite seu email'
          error={error}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            input: InputOnChangeData
          ) => this.handleChange('email', input)}
          onBlur={() => this.validateEmail()}
        />
        <Form.Input
          required
          label='Senha'
          value={password}
          placeholder='Digite sua senha'
          autoComplete='new-password'
          type='password'
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            input: InputOnChangeData
          ) => this.handleChange('password', input)}
        />
        <div className='center'>
          <Button
            type='submit'
            primary
            size='large'
          > 
            Entrar
          </Button>
        </div>
      </Form>
    )
  }
}
