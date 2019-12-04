type Admin = {
  id: string
  role: string
}

type User = {
  email: string
}

function redirect(user: Admin | User) {
  if ('role' in user) {
    // typescript automatically knows that the `user` object is Admin
    // due to object being present in the `Admin` type
    console.log('Welcome Admin!')
  } else {
    console.log(`Welcome ${user.email}`)
  }
}

redirect({
  id: '123',
  role: 'SuperAdmin',
})

redirect({
  email: 'user@user.com',
})

export {}
