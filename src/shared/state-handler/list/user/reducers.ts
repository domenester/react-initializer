import InitialState, { IListFilter } from './initial-state'

const initialState = InitialState()

export const UserListReducers =  {
  resetState: (state: any, payload: any) => initialState,
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
      page: payload,
      pageHistory: [ ...state.pageHistory, payload ]
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
      rowsPerPage: payload,
      take: payload
    }
  },
  setFilter: (state: any, payload: IListFilter) => {
    let search = payload?.search;
    switch (search) {
      case '': search = undefined
      break;
      case undefined: search = state?.filter?.search
      break;
    }
    let range = payload?.range
    switch (range) {
      case undefined: range = state?.filter?.range
      break;
      default: range = { ...state?.filter?.range, ...range }
    }
    
    return {
      ...state,
      filter: { search, range }
    }
  },
  resetList: (state: any, payload: any) => {
    return {
      ...state,
      rows: initialState.rows,
      pageHistory: initialState.pageHistory,
      page: initialState.page
    }
  }
}
