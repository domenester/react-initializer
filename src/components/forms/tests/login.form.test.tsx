import React from 'react';
import LoginForm from '../login';
import { fireEvent, act } from '@testing-library/react';
import { UserMocks } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { AuthServiceProvider } from '../../../services'

import 'mutationobserver-shim';
(global as any).MutationObserver = window.MutationObserver;


describe('Login Form', () => {
  const userDefault = UserMocks().default
  const render = (onSubmit: jest.Mock) => renderWithRouterAndContext(
    <AuthServiceProvider>
      <LoginForm onSubmitTest={onSubmit}/>
    </AuthServiceProvider>
  )

  it("expect to throw with invalid email", async () => {
    const onSubmit = jest.fn()
    const { getByTestId } = render(onSubmit)
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit')
    await act(async () => {
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
      fireEvent.change(passwordInput, { target: { value: userDefault.password } })
      fireEvent.click(buttonSubmit)
    })
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it("expect to submit", async () => {
    const onSubmit = jest.fn()
    const { getByTestId } = render(onSubmit)
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit')
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: userDefault.email } });
      fireEvent.change(passwordInput, { target: { value: userDefault.password } });
      fireEvent.click(buttonSubmit);
    })
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
