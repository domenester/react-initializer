import React from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import ProviderGenerator from '../shared/provider-generator';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { post } = useRequestServiceValue()
 
  const requestReset = async (email: string) => {
    const { data } = await post('password/request-reset', { email })
    return data;
  }

  const reset = async (password: string) => {
    const { data } = await post('password/reset', { password })
    return data;
  }

  return {
    requestReset,
    reset
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const PasswordServiceProviderGenerated = providerGenerated.provider

const PasswordServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <PasswordServiceProviderGenerated>
        {children}
      </PasswordServiceProviderGenerated>
    </RequestServiceProvider>
  )
}

const PasswordServiceContext = providerGenerated.context
const usePasswordServiceValue = providerGenerated.useValue

export {
  PasswordServiceProvider,
  PasswordServiceContext,
  usePasswordServiceValue
};