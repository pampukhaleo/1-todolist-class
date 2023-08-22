import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './components/TodoList/TodoList';

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type TodoListType = {
  id: string
  name: string
  filter: FilterValuesType
  disabled: boolean
}

type TasksType = {
  [key: string]: Task[]
}

function App() {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, name: 'What to learn', filter: 'Active', disabled: true },
    { id: todoListId2, name: 'What to buy', filter: 'Completed', disabled: true },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksType>({
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

  const removeTask = (id: string, todoListId: string) => {
    const tasks = tasksObj[todoListId]
    tasksObj[todoListId] = tasks.filter(task => task.id !== id)
    setTasksObj({ ...tasksObj })
  }

  const createTask = (inputValue: string, todoListId: string) => {
    const newTask = {
      id: v1(),
      title: inputValue,
      isDone: false
    }
    const tasks = tasksObj[todoListId]
    tasksObj[todoListId] = [...tasks, newTask]

    setTasksObj({ ...tasksObj })
  }

  const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
    const tasks = tasksObj[todoListId]

    // const newStatus = tasks.map(task => id === task.id ? {...task, isDone: !task.isDone  }: task)
    // console.log(newStatus)
    tasksObj[todoListId] = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task,
          isDone: isDone
        }
      }
      return task
    })
    setTasksObj({ ...tasksObj })
  }

  const disableHandler = (id: string, todoListId: string) => {
    disablingInput(todoListId)
    inputEditInitialValue(id, todoListId);
    setEditId(id)
  }

  const disablingInput = (todoListId: string) => {
    const newTodoList = todoLists.map(tl => {
      if (tl.id === todoListId) {
        return {
          ...tl,
          disabled: !tl.disabled
        }
      }
      return tl
    })
    setTodoLists(newTodoList)
  }

  const inputEditInitialValue = (id: string, todoListId: string) => {
    const tasks = tasksObj[todoListId]

    const filteredTask = tasks.filter(task => {
      return task.id === id
    })
    setEditInputValue(filteredTask[0].title)
  }

  const editTask = (title: string, todoListId: string) => {
    const tasks = tasksObj[todoListId]

    tasksObj[todoListId] = tasks.map(task => {
      if (task.id === editId) {
        return {
          ...task,
          title: title
        }
      }
      return task
    })
    setTasksObj({ ...tasksObj })

    const newTodoList = todoLists.map(tl => {
      if (tl.id === todoListId) {
        return {
          ...tl,
          disabled: !tl.disabled
        }
      }
      return tl
    })
    setTodoLists(newTodoList)
  }

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    const newTodoLists = todoLists.map(tl => {
      if (tl.id === todoListId) {
        return {
          ...tl,
          filter: value
        }
      }
      return tl
    })
    setTodoLists(newTodoLists)
  }

  const deleteTodoList = (todoListId: string) => {
    const newTodoListArr = todoLists.filter(todoList => todoList.id !== todoListId)
    delete tasksObj[todoListId]
    setTodoLists(newTodoListArr);
  }

  const addTodoList = () => {
    const newId = v1()
    const newTodoList: TodoListType = {
      id: newId,
      name: 'New TodoList',
      filter: 'All',
      disabled: true
    }
    const newTask: TasksType = {
      [newId]: [{ id: v1(), title: 'New Task', isDone: false }]
    }
    setTodoLists([...todoLists, newTodoList])
    setTasksObj({...tasksObj, ...newTask})
  }

  return (
    <div className="App">
      <button onClick={addTodoList}>create</button>
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

          return <TodoList
            key={ tl.id }
            todoListId={ tl.id }
            header={ tl.name }
            taskFilterStatus={ tl.filter }
            disabled={ tl.disabled }
            editInputValue={ editInputValue }
            tasks={ filterStatus }
            removeTask={ removeTask }
            createTask={ createTask }
            editTask={ editTask }
            changeStatus={ changeStatus }
            changeFilter={ changeFilter }
            disableHandler={ disableHandler }
            disablingInput={ disablingInput }
            deleteTodoList={ deleteTodoList }
          />
        })
      }

    </div>
  );
}

export default App;
