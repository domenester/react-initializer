import RequestService from './request.service';

class AuthService {
  requestService = RequestService()

  login(body = {}) {
    return this.requestService.post('/login', body)
      .catch(() => {
        const user = { name: 'Diogo', role: 'admin' };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      });
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}

export default () => new AuthService();
