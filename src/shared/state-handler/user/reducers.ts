export default {
  setUser: (state: any, payload: any) => {
    const user = { ...state.user, ...payload }
    localStorage.setItem('user', JSON.stringify(user))
    return {
      ...state,
      user
    }
  }
}
