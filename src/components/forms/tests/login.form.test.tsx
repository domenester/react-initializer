import React from 'react';
import LoginForm from '../login';
import { fireEvent, act } from '@testing-library/react';
import { userDefault } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { AuthService } from '../../../services'

import 'mutationobserver-shim';
(global as any).MutationObserver = window.MutationObserver;

/**
 * TODO: Adjust test to auth service provider structure
 */

describe('Form Login Testes', () => {
  const authService = AuthService()

  it("expect to not be authenticated after login with invalid email", async () => {
    const { getByTestId } = renderWithRouterAndContext(<LoginForm />);
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit')
    expect(authService.isAuthenticated()).toBe(false)
    await act(async () => {
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
      fireEvent.change(passwordInput, { target: { value: userDefault.password } })
      fireEvent.click(buttonSubmit)
    })
    expect(authService.isAuthenticated()).toBe(false)
  })

  it("expect to be authenticated after login", async () => {
    const { getByTestId } = renderWithRouterAndContext(<LoginForm />);
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit');
    expect(authService.isAuthenticated()).toBe(false)
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: userDefault.email } });
      fireEvent.change(passwordInput, { target: { value: userDefault.password } });
      fireEvent.click(buttonSubmit);
    })
    expect(authService.isAuthenticated()).toBe(true)
  })
})
