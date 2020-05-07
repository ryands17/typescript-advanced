type Todo = {
  id: number
  text: string
  completed: boolean
}

// enforce that the values cannot be changed
type ReadOnlyTodo = { readonly [K in keyof Todo]: Todo[K] }

// enforce all the values to be optional
type OptionalReadOnlyTodo = { readonly [K in keyof Todo]?: Todo[K] }

type IUser = {
  name: string
  age: number
  profilePic?: string
}

// -? changes all the optional parameters to be required
type ReadOnlyUser = { readonly [K in keyof IUser]-?: IUser[K] }

const todo1: ReadOnlyTodo = {
  id: 1,
  text: 'Learn TS',
  completed: false,
}

const todo2: OptionalReadOnlyTodo = {
  id: 1,
  text: 'Learn TS',
}

export {}
