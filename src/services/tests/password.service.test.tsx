import { AuthMocks } from './mocks'
import { PasswordServiceProvider, usePasswordServiceValue } from '../password.service'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react';
import { GlobalStateProvider } from '../../shared/state-handler';
import { act } from 'react-test-renderer';

describe('Password Service Testes', () => {
  const { result: { current } } = renderHook(
    () => usePasswordServiceValue(),
    { wrapper: ({ children }) => (
        <GlobalStateProvider>
          <PasswordServiceProvider>{children}</PasswordServiceProvider>
        </GlobalStateProvider>
      )
    }
  );

  it('should throw requesting password change with invalid email', async () => {
    const { requestReset } = current
    await act(() => requestReset( 'invalidemail' )
      .catch((err: any) => {
        const { response: { data } } = err
        expect(data.statusCode).toBe(400)
      }))
  })

  it.skip('should send link when request reset password', async () => {
    const { login: { valid } } = AuthMocks
    const { requestReset } = current
    const response = await requestReset( valid.default.email )
    expect(response).toBeDefined()
  })
})
