import React from 'react';
import { useForm } from 'react-hook-form'
import ForgotPasswordForm from '../forgot-password'
import { fireEvent, act, wait } from '@testing-library/react';
import { userDefault } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { PasswordServiceProvider } from '../../../services'

import 'mutationobserver-shim';
import { renderHook } from '@testing-library/react-hooks';
import { renderWithRouterAndContextRaw } from '../../../utils/tests';
(global as any).MutationObserver = window.MutationObserver;


describe('Form Login Testes', () => {
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
