import React from 'react';
import {
  ForgotPasswordForm
} from '../../components'
import './forgot-password.scss'
import { PasswordServiceProvider } from '../../services';

export const ForgotPasswordRoute = () => (
  <div className="centered-form">
    <PasswordServiceProvider>
      <ForgotPasswordForm/>
    </PasswordServiceProvider>
  </div>
)
