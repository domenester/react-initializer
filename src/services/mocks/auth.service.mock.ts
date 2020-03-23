export default class AuthServiceMocked {
  login() {
    const user = { name: 'User Mocked', role: 'admin' }
    localStorage.setItem('user', JSON.stringify(user));
    return user
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}