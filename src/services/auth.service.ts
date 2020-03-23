import RequestService from './request.service';
import AuthServiceMocked from './mocks/auth.service.mock'

class AuthService {
  requestService = RequestService()

  async login(body = {}) {
    const user = await this.requestService.post('/login', body)
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}

export default () => {
  if (Boolean(process.env.REACT_APP_REQUEST_MOCKED)) {
    return new AuthServiceMocked()
  }
  return new AuthService();
}
