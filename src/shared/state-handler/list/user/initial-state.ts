const rowsPerPage = 
  JSON.parse(localStorage.getItem('configurations') || '{}')?.list?.user?.rowsPerPage || 5

export default () => ({
  page: 0,
  rowsPerPage,
  rows: [],
  count: 0,
  take: rowsPerPage,
  skip: 0,
  pageHistory: [0],
  filter: ''
})
