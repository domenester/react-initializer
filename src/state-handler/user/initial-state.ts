export default () => ({
  user: JSON.parse(localStorage.getItem('user') || '{}'),
})
