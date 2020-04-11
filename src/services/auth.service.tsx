import React from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import history from './history.service'
import ProviderGenerator from '../shared/provider-generator';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { post } = useRequestServiceValue()
 
  const login = async (email: string, password: string) => {
    const { data } = await post('auth/login', { email, password })
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login')
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  }

  return {
    login,
    logout,
    isAuthenticated
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const AuthServiceProviderGenerated = providerGenerated.provider

const AuthServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <AuthServiceProviderGenerated>
        {children}
      </AuthServiceProviderGenerated>
    </RequestServiceProvider>
  )
}

const AuthServiceContext = providerGenerated.context
const useAuthServiceValue = providerGenerated.useValue

export {
  AuthServiceProvider,
  AuthServiceContext,
  useAuthServiceValue
};