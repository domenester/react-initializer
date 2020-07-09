export default {
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
