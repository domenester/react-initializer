import { TReducers } from "../../interfaces"
import initialState from './initial-state'

export const UserListReducers: TReducers =  {
  resetState: (state: any, payload: any) => initialState(),
  setRows: (state: any, payload: any) => ({
      ...state,
      rows: payload
    }
  ),
  setCount: (state: any, payload: any) => ({
      ...state,
      count: payload
    }
  ),
  setPage: (state: any, payload: any) => ({
      ...state,
      page: payload
    }
  ),
  setSkip: (state: any, payload: any) => ({
      ...state,
      skip: payload
    }
  ),
  setRowsPerPage: (state: any, payload: any) => {
    const config = JSON.parse(localStorage.getItem('configurations') as string)
    config.list.user.rowsPerPage = payload
    localStorage.setItem('configurations', JSON.stringify(config))
    return {
      ...state,
      rowsPerPage: payload
    }
  }
}
