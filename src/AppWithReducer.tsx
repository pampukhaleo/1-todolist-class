import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { AddForm } from './components/AddForm/AddForm';
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { blue, yellow } from '@mui/material/colors';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  CloseTodoListInputAC,
  RemoveTodoListAC,
  todoListsReducer
} from "./reducers/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./reducers/tasks-reducer";

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  name: string
  filter: FilterValuesType
  disabled: boolean
}

export type TasksType = {
  [key: string]: Task[]
}

export const AppWithReducer = () => {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
    { id: todoListId1, name: 'What to learn', filter: 'Active', disabled: true },
    { id: todoListId2, name: 'What to buy', filter: 'Completed', disabled: true },
  ]);

  const [tasksObj, dispatchToTasksObj] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: 'Vasiliy', isDone: true },
      { id: v1(), title: 'Oleg', isDone: true },
      { id: v1(), title: 'Leo', isDone: false },
      { id: v1(), title: 'Alex', isDone: false },
      { id: v1(), title: 'James', isDone: false }
    ],
  });

  const [editId, setEditId] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [lightMode, setLightMode] = useState(false);

  //task
  const removeTask = (id: string, todoListId: string) => {
    dispatchToTasksObj(removeTaskAC(id, todoListId))
  }
  const createTask = (inputValue: string, todoListId: string) => {
    dispatchToTasksObj(addTaskAC(inputValue, todoListId))
  }

  const editTaskTitle = (title: string, todoListId: string) => {
    dispatchToTasksObj(changeTaskTitleAC(editId, title, todoListId))
    closeEditInput(todoListId)
  }
  const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
    dispatchToTasksObj(changeTaskStatusAC(id, isDone, todoListId))
  }

  //task initial value + close Edit task input
  const disableEditInputHandler = (id: string, todoListId: string) => {
    closeEditInput(todoListId)
    inputEditInitialValue(id, todoListId);
    setEditId(id)
  }
  const closeEditInput = (todoListId: string) => {
    dispatchToTodoLists(CloseTodoListInputAC(todoListId))
  }
  const inputEditInitialValue = (id: string, todoListId: string) => {
    const tasks = tasksObj[todoListId]

    const filteredTask = tasks.filter(task => {
      return task.id === id
    })
    setEditInputValue(filteredTask[0].title)
  }

  //todolist
  const changeTodolistFilter = (value: FilterValuesType, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListFilterAC(value, todoListId))
  }
  const addTodoList = (text: string) => {
    const newId = v1()

    dispatchToTodoLists(AddTodoListAC(text, newId))
    dispatchToTasksObj(AddTodoListAC(text, newId))
  }
  const deleteTodoList = (todoListId: string) => {
    let action = RemoveTodoListAC(todoListId)
    dispatchToTodoLists(action)
    dispatchToTasksObj(action)
  }
  const editTodoListTitle = (value: string, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListTitleAC(value, todoListId))
  }

  const toggleTheme = () => {
    setLightMode(!lightMode)
  }

  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: yellow,
      mode: lightMode ? 'light' : 'dark'
    }
  })

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <div className="App">
        <AppBar position="static">
          <Toolbar sx={ { display: 'flex', justifyContent: 'space-between' } }> <IconButton color="inherit">
            <Menu/>
          </IconButton>
            <Typography variant="h6">
              Todo Lists
            </Typography>
            <Box>
              <Button color="inherit" variant="outlined" sx={ { mr: '15px' } }>
                Log Out
              </Button>
              <Button color="inherit"
                      variant="outlined"
                      onClick={ toggleTheme }
              >
                { lightMode ? 'Set Dark' : 'Set Light' }
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={ { p: '15px' } }>
          <Grid container
                sx={ { justifyContent: 'center', alignItems: 'center', mb: '15px' } }>
            <AddForm addTask={ addTodoList }/>
          </Grid>
          <Grid container spacing={ 5 }>
            {
              todoLists.map(tl => {
                const filterStatus = () => {
                  let filteredTasks = tasksObj[tl.id]
                  switch (tl.filter) {
                    case 'Active': {
                      return filteredTasks = filteredTasks.filter(task => !task.isDone)
                    }
                    case 'Completed': {
                      return filteredTasks = filteredTasks.filter(task => task.isDone)
                    }
                    default: {
                      return filteredTasks
                    }
                  }
                }

                return <Grid item>
                  <Paper sx={ { p: '15px' } } elevation={ 10 }>
                    <TodoList
                      key={ tl.id }
                      todoListId={ tl.id }
                      taskFilterStatus={ tl.filter }
                      disabled={ tl.disabled }
                      todoListInitialValue={ tl.name }
                      taskInputInitialValue={ editInputValue }
                      tasks={ filterStatus }
                      removeTask={ removeTask }
                      createTask={ createTask }
                      editTask={ editTaskTitle }
                      changeStatus={ changeTaskStatus }
                      changeFilter={ changeTodolistFilter }
                      disableHandler={ disableEditInputHandler }
                      closeEditInput={ closeEditInput }
                      deleteTodoList={ deleteTodoList }
                      editTodoListTitle={ editTodoListTitle }
                    />
                  </Paper>
                </Grid>

              })
            }
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
