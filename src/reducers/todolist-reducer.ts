import { FilterValuesType, TodoListType } from '../App'

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST',
  todoListId: string
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST',
  newTitle: string,
  todoListId: string
}

export type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE',
  value: string,
  todoListId: string
}

export type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER',
  value: FilterValuesType,
  todoListId: string
}

export type CloseEditInputAT = {
  type: 'CLOSE-TODOLIST-INPUT',
  todoListId: string
}

type ActionTypes = AddTodoListAT |
  RemoveTodoListAT |
  ChangeTodoListTitleAT |
  ChangeTodoListFilterAT |
  CloseEditInputAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todoLists.filter(todoList => todoList.id !== action.todoListId)
    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todoListId,
        name: action.newTitle,
        filter: 'All',
        disabled: true
      }
      return [...todoLists, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => {
        if (tl.id === action.todoListId) {
          return {
            ...tl,
            name: action.value
          }
        }
        return tl
      })
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => {
        if (tl.id === action.todoListId) {
          return {
            ...tl,
            filter: action.value
          }
        }
        return tl
      })
    case 'CLOSE-TODOLIST-INPUT':
      return todoLists.map(tl => {
        if (tl.id === action.todoListId) {
          return {
            ...tl,
            disabled: !tl.disabled
          }
        }
        return tl
      })
    default:
      return todoLists
  }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => ({
  type: 'REMOVE-TODOLIST',
  todoListId
})

export const AddTodoListAC = (newTitle: string, todoListId: string): AddTodoListAT => ({
  type: 'ADD-TODOLIST',
  newTitle,
  todoListId
})

export const ChangeTodoListTitleAC = (value: string, todoListId: string): ChangeTodoListTitleAT => ({
  type: 'CHANGE-TODOLIST-TITLE',
  value,
  todoListId
})

export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({
  type: 'CHANGE-TODOLIST-FILTER',
  value,
  todoListId
})

export const CloseTodoListInputAC = (todoListId: string): CloseEditInputAT => ({
  type: 'CLOSE-TODOLIST-INPUT',
  todoListId
})

