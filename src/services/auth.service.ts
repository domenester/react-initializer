import RequestService from './request.service';
import history from './history.service'

class AuthService {
  requestService = RequestService()

  async login(body = {}) {
    const user = await this.requestService.post('/login', body)
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.removeItem('user');
    history.push('/login')
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}

class AuthServiceMocked extends AuthService {
  requestService = RequestService()
  async login() {
    const user = { name: 'User Mocked', role: 'admin' }
    localStorage.setItem('user', JSON.stringify(user));
    return user as any
  }
}

export default (): AuthService => {
  if (Boolean(process.env.REACT_APP_REQUEST_MOCKED)) {
    return new AuthServiceMocked()
  }
  return new AuthService();
}
