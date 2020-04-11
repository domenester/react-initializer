import React from 'react';
import LoginForm from '../login';
import { fireEvent, act, wait } from '@testing-library/react';
import { userDefault } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { useAuthServiceValue, AuthServiceProvider } from '../../../services'
import { renderHook } from '@testing-library/react-hooks';

import 'mutationobserver-shim';
(global as any).MutationObserver = window.MutationObserver;


describe('Form Login Testes', () => {
  const render = () => renderWithRouterAndContext(
    <AuthServiceProvider>
      <LoginForm />
    </AuthServiceProvider>
  )
  const useAuthService = () => renderHook(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    () => useAuthServiceValue(),
    { wrapper: AuthServiceProvider }
  );

  it("expect to not be authenticated after login with invalid email", async () => {
    const { getByTestId } = render()
    const { result: { current: { isAuthenticated } } } = useAuthService()
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit')
    expect(isAuthenticated()).toBe(false)
    await act(async () => {
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
      fireEvent.change(passwordInput, { target: { value: userDefault.password } })
      fireEvent.click(buttonSubmit)
    })
    expect(isAuthenticated()).toBe(false)
  })

  it("expect to be authenticated after login", async () => {
    const { getByTestId } = render()
    const { result: { current: { isAuthenticated } } } = useAuthService()
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit');
    expect(isAuthenticated()).toBe(false)
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: userDefault.email } });
      fireEvent.change(passwordInput, { target: { value: userDefault.password } });
    })
    fireEvent.click(buttonSubmit);
    await wait (() => {
      expect(isAuthenticated()).toBe(true)
    })
  })
})
