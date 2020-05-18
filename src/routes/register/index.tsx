import React from 'react';
import {
  RegisterForm
} from '../../components'
import './register.scss'
import { RegisterServiceProvider } from '../../services'

export const RegisterRoute = () => (
  <div className="centered-form">
    <RegisterServiceProvider>
      <RegisterForm/>
    </RegisterServiceProvider>
  </div>
)
