import React, { Component } from 'react';
import {
  LoginForm
} from '../../components'
import './login.scss'

export class LoginRoute extends Component {
  render() {
    return (
      <div className="login-content">
        <LoginForm/>
      </div>
    )
  }
}
