import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { Task } from './components/TodoList/TodoList';

function App() {
  const header = 'What to learn'

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false }
  ])

  const [disabled, setDisabled] = useState<boolean>(true)
  const [editId, setEditId] = useState('');

  const removeTask = (id: string) => setTasks(tasks.filter(task => task.id != id))

  const createTask = (inputValue: string) => {
    const newTask = {
      id: v1(),
      title: inputValue,
      isDone: false
    }
    setTasks([...tasks, newTask])
  }

  const changeStatus = (id: string, isDone: boolean) => {
    const newStatus = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task,
          isDone: isDone
        }
      }
      return task
    })
    // const newStatus = tasks.map(task => id === task.id ? {...task, isDone: !task.isDone  }: task)
    // console.log(newStatus)
    setTasks(newStatus)
  }

  const disableHandler = (id: string) => {
    setDisabled(false)
    setEditId(id)
  }

  const editTask = (title: string) => {

    const editedTask = tasks.find(task => task.id === editId)
    if (editedTask) {
      editedTask.title = title
    }
    setTasks([...tasks])
    setDisabled(true)
  }

  return (
    <div className="App">
      <TodoList
        header={ header }
        tasks={ tasks }
        removeTask={ removeTask }
        changeStatus={ changeStatus }
        createTask={ createTask }
        editTask={ editTask }
        disableHandler={ disableHandler }
        disabled={ disabled }
      />
    </div>
  );
}

export default App;
