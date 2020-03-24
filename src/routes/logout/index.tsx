import React from 'react';
import { AuthService } from '../../services'
import { Redirect } from 'react-router-dom';

export const LogoutRoute = () => {
  const authService = AuthService()
  authService.logout()
  return <Redirect to="/login" />
}