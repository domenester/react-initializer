import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import { UserMocks } from '../../../mocks'
import { renderWithRouterAndContext } from '../../../utils'
import { UserServiceProvider } from '../../../services'
import { UserHandleForm } from '..';
import { UserFormStateProvider } from '../../../shared/state-handler';
import { ErrorMessages } from '../../../messages/error';
import { RenderTestFunction } from '../../../interfaces';

import 'mutationobserver-shim';
(global as any).MutationObserver = window.MutationObserver;


describe('User Form', () => {
  const userMocks = UserMocks()

  const componentToRender = (onSubmit: jest.Mock) => (
    <UserServiceProvider>
      <UserFormStateProvider>
        <UserHandleForm onSubmitTest={onSubmit}/>
      </UserFormStateProvider>
    </UserServiceProvider>
  )

  const render = (
    onSubmit: jest.Mock
  ) => renderWithRouterAndContext(componentToRender(onSubmit))

  const fillFormAndSubmit = async (
    getByTestId: RenderTestFunction,
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    const nameInput = getByTestId('nameInput')
    const usernameInput = getByTestId('usernameInput')
    const emailInput = getByTestId('emailInput')
    const passwordInput = getByTestId('passwordInput')
    const buttonSubmit = getByTestId('buttonSubmit')

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: name } })
      fireEvent.change(usernameInput, { target: { value: username } })
      fireEvent.change(emailInput, { target: { value: email } })
      fireEvent.change(passwordInput, { target: { value: password } })
      fireEvent.click(buttonSubmit)
    })
  }

  it("expect to throw with invalid email", async () => {
    const { create: { invalid: { email: {
      name, username, email, password
    } } } } = userMocks

    const onSubmit = jest.fn();
    const { getByTestId, queryByText } = render(onSubmit)

    await fillFormAndSubmit(
      getByTestId,
      name,
      username,
      email,
      password
    )

    expect(queryByText(ErrorMessages.form.validation.email)).toBeDefined()
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it("expect to submit", async () => {
    const { create: { valid: {
      name, username, email, password
    } } } = userMocks

    const onSubmit = jest.fn();
    const { getByTestId } = render(onSubmit)

    await fillFormAndSubmit(
      getByTestId,
      name,
      username,
      email,
      password
    )

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
