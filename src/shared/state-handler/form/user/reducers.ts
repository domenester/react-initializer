import { TReducers } from "../../interfaces"
import InitialState from './initial-state'

const initialState = InitialState()

export const UserFormReducers: TReducers =  {
  resetState: () => initialState,
  setFields: (state: any, payload: any) => ({
    id: payload.id || initialState.id,
    email: payload.email || initialState.email,
    password: payload.password || initialState.password,
    username: payload.username || initialState.username,
    name: payload.name || initialState.name,
  }),
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
  ),
  setId: (state: any, payload: any) => ({
    ...state,
    id: payload
  }
)
}
