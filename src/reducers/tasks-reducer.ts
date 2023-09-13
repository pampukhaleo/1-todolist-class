import { TasksType } from '../App'
import { v1 } from "uuid";
import { AddTodoListAT, RemoveTodoListAT } from "./todolist-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionTypes = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListAT
  | RemoveTodoListAT

export const tasksReducer = (state: TasksType, action: ActionTypes) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
      }
    case 'ADD-TASK':
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      return {
        ...state,
        [action.todoListId]: [...state[action.todoListId], newTask]
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task =>
          action.taskId === task.id
            ? { ...task, isDone: action.isDone }
            : task)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task =>
          action.taskId === task.id
            ? { ...task, title: action.title }
            : task)
      }

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoListId]: []
      }
    case "REMOVE-TODOLIST":
      // let copyState = { ...state }
      // delete copyState[action.todoListId]
      // return copyState
      const {[action.todoListId]: [], ...rest} = state
      return rest

    default:
      throw new Error('I do not understand this type')
  }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
  return { type: 'REMOVE-TASK', taskId, todoListId } as const
}

export const addTaskAC = (title: string, todoListId: string) => {
  return { type: 'ADD-TASK', title, todoListId } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
  return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId } as const
}
