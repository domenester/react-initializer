import React, { createContext, useContext } from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import history from './history.service'

const AuthServiceContext = createContext({} as any);

const AuthServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <AuthServiceProvided>
        {children}
      </AuthServiceProvided>
    </RequestServiceProvider>
  )
}

const AuthServiceProvided = ({ children }: any) => {

  const { post } = useRequestServiceValue()

  const login = async (email: string, password: string) => {
    const user = await post('auth/login', { email, password })
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login')
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  }

  const value = {
    login,
    logout,
    isAuthenticated
  }

  return (
      <AuthServiceContext.Provider value={value}>
        {children}
      </AuthServiceContext.Provider>
  )
};

const useAuthServiceValue = () => useContext(AuthServiceContext);

export {
  AuthServiceContext,
  AuthServiceProvider,
  useAuthServiceValue
};