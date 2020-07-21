import React from 'react';
import { fireEvent, act, cleanup, RenderResult, waitFor, waitForDomChange } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { useAuthServiceValue, AuthServiceProvider } from '../services'
import { userDefault } from '../mocks';
import { renderHook } from '@testing-library/react-hooks';

import 'mutationobserver-shim';
import { useLoginTest } from '../hooks/login-test.hooks';
import { useUserListStateValue, UserListStateProvider } from '../shared/state-handler';
import App from '../App';
import { useUserRoute } from '../hooks/user-test.hooks';
(global as any).MutationObserver = window.MutationObserver;

describe('User E2E', () => {

  const { email, password } = userDefault

  afterEach(() => cleanup())

  it("should login", async () => {
    await useLoginTest(email, password)
  })

  it("should list user", async () => {
    const { getByTestId, getAllByRole } = render(<App />)
    const { result } = renderHook(
      () => useUserListStateValue(),
      { wrapper: UserListStateProvider }
    );
    const { current: { state: { rowsPerPage } } } = result
    await useUserRoute(getByTestId)
    await waitFor(() => {
      expect(getAllByRole('table-row').length).toBe(rowsPerPage)
    })
  })

  it("should filter user", async () => {
    const { getByTestId, getAllByRole } = render(<App />)
    await useUserRoute(getByTestId)
    const filterInput = getByTestId('filterInput')
    await act(async () => {
      fireEvent.change(filterInput, { target: { value: 'admin' } })
    })
    fireEvent.keyUp(filterInput, { key: 'Enter', code: 'Enter' })
    await waitFor(() => {
      expect(getAllByRole('table-row').length).toBe(1)
    })
  })
})
