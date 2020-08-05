import React from "react"
import App from "../App"
import { render, act, fireEvent, waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks";
import { useAuthServiceValue, AuthServiceProvider } from "../services"

const useAuthService = () => renderHook(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  () => useAuthServiceValue(),
  { wrapper: AuthServiceProvider }
);

export const useLoginTest = async (
  email: string,
  password: string,
  shouldFail: boolean = false
) => {
  const { getByTestId } = render(<App/>)
  const { result: { current: { isAuthenticated } } } = useAuthService()
  const emailInput = getByTestId('emailInput')
  const passwordInput = getByTestId('passwordInput')
  const buttonSubmit = getByTestId('buttonSubmit')
  expect(isAuthenticated()).toBe(false)
  await act(async () => {
    await waitFor (() => {
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: email } })
      fireEvent.change(passwordInput, { target: { value: password } })
    })
    fireEvent.click(buttonSubmit)
  })
  await waitFor (() => {
    expect(isAuthenticated()).toBe(!shouldFail)
    expect(getByTestId('sidebar-user')).toBeDefined()
  })
}