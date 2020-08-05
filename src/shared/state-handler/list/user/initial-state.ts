const rowsPerPage = 
  JSON.parse(localStorage.getItem('configurations') || '{}')?.list?.user?.rowsPerPage || 5

export interface IListFilter {
  search?: string
  range?: {
    field: string,
    from: Date,
    to: Date
  }
}

interface IListState {
  page: number
  rowsPerPage: number
  rows: any[]
  count: number
  take: number
  skip: number
  pageHistory: number[]
  filter?: IListFilter
}

export default () => {
  return {
    page: 0,
    rowsPerPage,
    rows: [],
    count: 0,
    take: rowsPerPage,
    skip: 0,
    pageHistory: [0]
  } as IListState
}
