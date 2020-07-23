import React from 'react';
import { fireEvent, act, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '@testing-library/react'
import { useUserServiceValue, UserServiceProvider } from '../services'
import { renderHook } from '@testing-library/react-hooks';

import 'mutationobserver-shim';
import { useLoginTest } from '../hooks/login-test.hooks';
import { useUserListStateValue, UserListStateProvider } from '../shared/state-handler';
import App from '../App';
import { useUserRoute } from '../hooks/user-test.hooks';
import { UserMocks } from '../mocks';

(global as any).MutationObserver = window.MutationObserver;

describe.skip('User E2E', () => {

  const userMocks = UserMocks()
  const { email, password } = userMocks.default

  afterEach(() => cleanup())

  afterAll( async () => {
    const { result: { current: { remove } } } = renderHook(
      () => useUserServiceValue(),
      { wrapper: UserServiceProvider }
    );  
    await remove(userMocks.update.valid.email)
  })

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

  it("should create user", async () => {
    const { valid } = userMocks.create
    const { getByTestId, getByText } = render(<App />)
    await useUserRoute(getByTestId)
    const openModalButton = getByTestId('openAddUserModal')
    await act(async () => {
      fireEvent.click(openModalButton)
      await waitFor(() => {
        const emailInput = getByTestId('emailInput')
        const usernameInput = getByTestId('usernameInput')
        const nameInput = getByTestId('nameInput')
        const passwordInput = getByTestId('passwordInput')
        fireEvent.change(emailInput, { target: { value: valid.email } })
        fireEvent.change(usernameInput, { target: { value: valid.username } })
        fireEvent.change(nameInput, { target: { value: valid.name } })
        fireEvent.change(passwordInput, { target: { value: valid.password } })
      })
      const buttonSubmit = getByTestId('buttonSubmit')
      fireEvent.click(buttonSubmit)
    })

    await waitFor(() => {
      expect(getByText(valid.email)).toBeDefined()
    })
  })

  it("should edit user", async () => {
    const { valid } = userMocks.update
    const { getByTestId, queryByText } = render(<App />)
    await useUserRoute(getByTestId)
    let triggerActionButton: HTMLElement;
    await waitFor(() => {
      triggerActionButton = getByTestId('table-action-trigger-0')
    })
    await act(async () => {
      fireEvent.click(triggerActionButton)
      await waitFor(() => {
        const editActionButton = getByTestId('table-action-edit')
        fireEvent.click(editActionButton)
      })
      await waitFor(() => {
        const emailInput = getByTestId('emailInput')
        const usernameInput = getByTestId('usernameInput')
        const nameInput = getByTestId('nameInput')
        fireEvent.change(emailInput, { target: { value: valid.email } })
        fireEvent.change(usernameInput, { target: { value: valid.username } })
        fireEvent.change(nameInput, { target: { value: valid.name } })
      })
      await waitFor(() => {
        const buttonSubmit = getByTestId('buttonSubmit')
        fireEvent.click(buttonSubmit)
      })
    })

    await waitFor(() => {
      expect(queryByText(valid.email)).toBeDefined()
      expect(queryByText(valid.username)).toBeDefined()
      expect(queryByText(valid.name)).toBeDefined()
    })
  })

  it("should disable user", async () => {
    const { getByTestId, getByText } = render(<App />)
    await useUserRoute(getByTestId)
    await act(async () => {
      await waitFor(() => {
        const triggerActionButton = getByTestId('table-action-trigger-0')
        fireEvent.click(triggerActionButton)
      })
      await waitFor(() => {
        const editActionButton = getByTestId('table-action-disable')
        fireEvent.click(editActionButton)
      })
      await waitFor(() => {
        expect(getByText('Usuário desabilitado com sucesso')).toBeDefined()
      })
      await waitForElementToBeRemoved(() => getByText('Usuário desabilitado com sucesso'))
    })
  })

  it("should enable user", async () => {
    const { getByTestId, getByText } = render(<App />)
    await useUserRoute(getByTestId)
    await act(async () => {
      await waitFor(() => {
        const triggerActionButton = getByTestId('table-action-trigger-0')
        fireEvent.click(triggerActionButton)
      })
      await waitFor(() => {
        const editActionButton = getByTestId('table-action-enable')
        fireEvent.click(editActionButton)
      })
      await waitFor(() => {
        expect(getByText('Usuário habilitado com sucesso')).toBeDefined()
      })
      await waitForElementToBeRemoved(() => getByText('Usuário habilitado com sucesso'))
    })
  })
})
