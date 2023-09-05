import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer
} from './todolist-reducer';

test('correct todolist should be removed', () => {
  //
  const todolistId1 = v1();
  const todolistId2 = v1();
  const startState: Array<TodoListType> = [
    {id: todolistId1, name: "What to learn", filter: "All", disabled: true},
    {id: todolistId2, name: "What to buy", filter: "All", disabled: true}
  ]
  //
  const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

  //
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('should be added correct todolist ', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, name: "What to learn", filter: "All", disabled: true},
    {id: todolistId2, name: "What to buy", filter: "All", disabled: true}
  ]
  //
  const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle, v1()))
  //
  expect(endState.length).toBe(3);
  expect(endState[2].name).toBe(newTodolistTitle);
});

test('should change name  of correct todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, name: "What to learn", filter: "All", disabled: true},
    {id: todolistId2, name: "What to buy", filter: "All", disabled: true}
  ]

  const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

  expect(endState[0].name).toBe("What to learn");
  expect(endState[1].name).toBe(newTodolistTitle);
});

test('should change filter of correct todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "Completed";
  const startState: Array<TodoListType> = [
    {id: todolistId1, name: "What to learn", filter: "All", disabled: true},
    {id: todolistId2, name: "What to buy", filter: "All", disabled: true}
  ]

  const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
