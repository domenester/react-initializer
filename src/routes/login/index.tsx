import React from 'react';
import {
  LoginForm
} from '../../components'
import './login.scss'
import { AuthServiceProvider } from '../../services';

export const LoginRoute = () => (
  <div className="centered-form">
    <AuthServiceProvider>
      <LoginForm/>
    </AuthServiceProvider>
  </div>
)
