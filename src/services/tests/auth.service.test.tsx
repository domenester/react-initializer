import { AuthMocks } from './mocks'
import { AuthServiceProvider, useAuthServiceValue } from '../auth.service'
import { renderHook } from '@testing-library/react-hooks'

describe('Auth Service Testes', () => {
  const { result: { current } } = renderHook(
    () => useAuthServiceValue(),
    { wrapper: AuthServiceProvider }
  );

  it('shouldn\'t be authenticated', () => {
    const { isAuthenticated } = current
    expect(isAuthenticated()).toBe(false)
  })

  it('should login the default user mocked', async () => {
    const { login: { valid } } = AuthMocks
    const { login } = current
    const response = await login(
      valid.default.email,
      valid.default.password
    )
    expect(response.data.user.email).toBe(valid.default.email)
  })

  it('should be authenticated', async () => {
    const { isAuthenticated } = current
    expect(isAuthenticated()).toBe(true)
  })

  it('should logout', async () => {
    const { logout } = current
    logout()
    expect(localStorage.getItem('user')).toBe(null)
  })

})
