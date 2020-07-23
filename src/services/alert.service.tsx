import React from 'react';
import ProviderGenerator from '../shared/provider-generator';
import { useSnackBarStateValue, SnackBarStateProvider } from '../shared/state-handler';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { dispatch } = useSnackBarStateValue()

  const multipleErrors = (errors: { [key: string]: { message: string } }) => {
    const messages = Object.keys(errors)
      .map(key => errors[key].message).join(', ')
    
    dispatch({
      type: 'set',
      payload: {
        open: true,
        message: messages,
        severity: 'error'
      }
    })
  }

  const show = (message: string, severity = 'success') => {
    dispatch({
      type: 'set',
      payload: {
        open: true,
        message,
        severity
      }
    })
  }

  return {
    multipleErrors,
    success: (message: string) => show(message),
    error: (message: string) => show(message, 'error'),
    warning: (message: string) => show(message, 'warn')
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const AlertServiceProviderGenerated = providerGenerated.provider

const AlertServiceProvider = ({ children }: any) => {
  return (
    <SnackBarStateProvider>
      <AlertServiceProviderGenerated>
        {children}
      </AlertServiceProviderGenerated>
    </SnackBarStateProvider>
  )
}

const AlertServiceContext = providerGenerated.context
const useAlertServiceValue = providerGenerated.useValue

export {
  AlertServiceProvider,
  AlertServiceContext,
  useAlertServiceValue
};