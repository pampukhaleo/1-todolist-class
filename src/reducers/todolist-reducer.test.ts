import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer
} from './todolist-reducer';

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, name: "What to learn", filter: "All", disabled: true },
    { id: todolistId2, name: "What to buy", filter: "All", disabled: true }
  ]
})

test('correct todolist should be removed', () => {
  const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('should be added correct todolist ', () => {
  let newTodolistTitle = "New Todolist";
  const newId = v1()

  const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle, newId))

  expect(endState.length).toBe(3);
  expect(endState[2].name).toBe(newTodolistTitle);
});

test('should change name  of correct todolist', () => {
  let newTodolistTitle = "New Todolist";

  const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

  expect(endState[0].name).toBe("What to learn");
  expect(endState[1].name).toBe(newTodolistTitle);
});

test('should change filter of correct todolist', () => {
  let newFilter: FilterValuesType = "Completed";

  const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
