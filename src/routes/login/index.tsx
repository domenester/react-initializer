import React from 'react';
import {
  LoginForm
} from '../../components'
import './login.scss'
import { AuthServiceProvider } from '../../services';

export const LoginRoute = () => (
  <div className="login-content">
    <AuthServiceProvider>
      <LoginForm/>
    </AuthServiceProvider>
  </div>
)
