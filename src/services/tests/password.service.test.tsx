import { AuthMocks } from './mocks'
import { PasswordServiceProvider, usePasswordServiceValue } from '../password.service'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react';
import { StateProvider } from '../../shared/state-handler';

describe('Password Service Testes', () => {
  const { result: { current } } = renderHook(
    () => usePasswordServiceValue(),
    { wrapper: ({ children }) => (
        <StateProvider>
          <PasswordServiceProvider>{children}</PasswordServiceProvider>
        </StateProvider>
      )
    }
  );

  it('should throw requesting password change with invalid email', async () => {
    const { login: { valid } } = AuthMocks
    const { requestReset } = current
    const response = await requestReset( valid.default.email )
    expect(response).toBeDefined()
  })
})
