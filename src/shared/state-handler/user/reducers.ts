import { TReducers } from "../interfaces"

export const UserReducers: TReducers = {
  setUser: (state: any, payload: any) => {
    const user = { ...state.user, ...payload }
    localStorage.setItem('user', JSON.stringify(user))
    return {
      ...state,
      user
    }
  }
}
