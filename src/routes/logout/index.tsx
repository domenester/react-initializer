import React from 'react';
import { useAuthServiceValue } from '../../services'
import { Redirect } from 'react-router-dom';

export const LogoutRoute = () => {
  const { logout } = useAuthServiceValue()
  logout()
  return <Redirect to="/login" />
}