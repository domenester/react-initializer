export default {
  setUser: (setState: Function, payload: any) => {
    localStorage.setItem('user', JSON.stringify(payload))
    return setState({user: payload})
  }
}