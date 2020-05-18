import React from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import ProviderGenerator from '../shared/provider-generator';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { post } = useRequestServiceValue()
 
  const register = async (email: string, password: string) => {
    const { data } = await post('register', { email, password })
    return data;
  }

  return {
    register
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const RegisterServiceProviderGenerated = providerGenerated.provider

const RegisterServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <RegisterServiceProviderGenerated>
        {children}
      </RegisterServiceProviderGenerated>
    </RequestServiceProvider>
  )
}

const RegisterServiceContext = providerGenerated.context
const useRegisterServiceValue = providerGenerated.useValue

export {
  RegisterServiceProvider,
  RegisterServiceContext,
  useRegisterServiceValue
};