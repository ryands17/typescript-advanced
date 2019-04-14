import { TodosState, ActionTypes } from './types'
import { prettyPrint } from '../functions'

const initialState: TodosState = {
  todos: [
    {
      id: Date.now() - 1000,
      text: 'Learn TypeScript',
      completed: false,
    },
  ],
}

const todosReducer = (state = initialState, action: ActionTypes): TodosState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const todos = [...state.todos]
      todos.push({ id: Date.now(), text: action.todoText, completed: true })
      return {
        todos,
      }
    }

    case 'TOGGLE_TODO': {
      const todos = [...state.todos]
      todos[action.index].completed = !todos[action.index].completed
      return {
        todos,
      }
    }

    default:
      return state
  }
}

console.log(
  prettyPrint(
    todosReducer(initialState, {
      type: 'ADD_TODO',
      todoText: 'Learn Redux',
    })
  )
)
