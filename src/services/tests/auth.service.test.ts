import { userDefault } from '../../mocks'
import { AuthService } from '../'

/**
 * TODO: Adjust tests according to new service hooks structure
 */

describe('Auth Service Testes', () => {
  const authService = AuthService()

  it('shouldn\'t be authenticated', () => {
    const isAuthenticated = authService.isAuthenticated()
    expect(isAuthenticated).toBe(false)
  })

  it('should login the default user mocked', async () => {
    const { email, password } = userDefault
    const userLogged = await authService.login({ email, password })
    expect(userLogged.data.email).toBe(email)
    expect(userLogged.data.name).toBe(userDefault.name)
  })

  it('should be authenticated', async () => {
    const isAuthenticated = authService.isAuthenticated()
    expect(isAuthenticated).toBe(true)
  })

  it('should logout', async () => {
    authService.logout()
    expect(localStorage.getItem('user')).toBe(null)
  })

})
