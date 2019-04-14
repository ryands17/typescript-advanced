interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface TodosState {
  todos: Todo[]
}

export interface TodosActions {
  type: string
}

export class AddTodo implements TodosActions {
  readonly type = 'ADD_TODO'
  constructor(public todoText: string) {}
}

export class ToggleTodo implements TodosActions {
  readonly type = 'TOGGLE_TODO'
  constructor(public index: number) {}
}

export type ActionTypes = AddTodo | ToggleTodo
