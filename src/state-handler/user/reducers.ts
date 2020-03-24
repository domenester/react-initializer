export default {
  setUser: (state: any, payload: any) => {
    localStorage.setItem('user', JSON.stringify(payload))
    return {
      ...state,
      user: payload,
    }
  }
}
