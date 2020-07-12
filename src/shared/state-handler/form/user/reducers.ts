import { TReducers } from "../../interfaces"
import initialState from './initial-state'

export const UserFormReducers: TReducers =  {
  resetState: () => initialState(),
  setEmail: (state: any, payload: any) => ({
      ...state,
      email: payload
    }
  ),
  setPassword: (state: any, payload: any) => ({
      ...state,
      password: payload
    }
  ),
  setUsername: (state: any, payload: any) => ({
      ...state,
      username: payload
    }
  ),
  setName: (state: any, payload: any) => ({
      ...state,
      name: payload
    }
  )
}
