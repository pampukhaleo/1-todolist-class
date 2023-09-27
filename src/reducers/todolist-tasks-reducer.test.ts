import { TasksType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { AddTodoListAC, todoListsReducer } from "./todolist-reducer";
import { v1 } from "uuid";

test('ids should be equals', () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: Array<TodoListType> = [];
  const newId = v1()
  const action = AddTodoListAC("new todolist", newId);

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodolists).toBe(action.todoListId);
});