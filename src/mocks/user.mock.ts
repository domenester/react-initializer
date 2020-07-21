export const UserMocks = () => {
  return (
    {
      default: {
        username: 'admin',
        email: 'admin@mail.com',
        password: '12345678',
        role: 'admin'
      },
      create: {
        valid: {
          email: '0created@mail.com',
          username: 'user.created',
          name: 'User Created',
          password: '12345678'
        }
      },
      update: {
        valid: {
          email: '0updated@mail.com',
          username: 'user.updated',
          name: 'User Updated'
        }
      }
    }
  )
}