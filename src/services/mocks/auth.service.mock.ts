export default class AuthServiceMocked {
  async login() {
    const user = { name: 'User Mocked', role: 'admin' }
    localStorage.setItem('user', JSON.stringify(user));
    return user as any
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}