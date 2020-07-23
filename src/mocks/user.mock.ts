const createValid = {
  email: '0created@mail.com',
  username: 'user.created',
  name: 'User Created',
  password: '12345678'
}

export const UserMocks = () => {
  return (
    {
      default: {
        id: 1,
        username: 'admin',
        email: 'admin@mail.com',
        password: '12345678',
        role: 'admin'
      },
      create: {
        valid: createValid,
        invalid: {
          email: {
            ...createValid,
            email: 'invalidemail'
          }
        }
      },
      update: {
        valid: {
          id: 1,
          email: '0updated@mail.com',
          username: 'user.updated',
          name: 'User Updated'
        },
        invalid: {
          email: {
            ...createValid,
            email: 'invalidemail'
          }
        }
      }
    }
  )
}