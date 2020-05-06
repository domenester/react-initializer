import React from 'react';
import ForgotPasswordForm from '../forgot-password'
import { fireEvent, act, wait } from '@testing-library/react';
import { userDefault } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { PasswordServiceProvider } from '../../../services'

import 'mutationobserver-shim';
(global as any).MutationObserver = window.MutationObserver;


describe.skip('Form Login Testes', () => {
  const componentToRender = (children?: any) => (
    <PasswordServiceProvider>
      {children}
      <ForgotPasswordForm/>
    </PasswordServiceProvider>
  )
  const render = () => renderWithRouterAndContext(componentToRender())

  it("expect to throw retrieving password with invalid email", async () => {
    const { getByTestId } = render()
    const emailInput = getByTestId('emailInput')
    const buttonSubmit = getByTestId('buttonSubmit')
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
      fireEvent.click(buttonSubmit)
    })
  })

  it("expect to send password request", async () => {
    const { getByTestId } = render()
    const emailInput = getByTestId('emailInput')
    const buttonSubmit = getByTestId('buttonSubmit');
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: userDefault.email } });
      fireEvent.click(buttonSubmit);
    })
  })
})
