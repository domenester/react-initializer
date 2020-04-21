import React from 'react';
import './reset-password.scss'
import { PasswordServiceProvider } from '../../services';
import {
  ResetPasswordForm
} from '../../components';

export const ResetPasswordRoute = () => (
  <div className="centered-form">
    <PasswordServiceProvider>
      <ResetPasswordForm/>
    </PasswordServiceProvider>
  </div>
)
