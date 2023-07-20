import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type FilterValuesType = 'All' | 'Completed' | 'Active'

function App() {
  const header = 'What to learn'

  const [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ])

  const [taskValue, setTaskValue] = useState('All')
  const [inputValue, setInputValue] = useState('')

  let filteredTasks = tasks
  if (taskValue === 'Active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (taskValue === 'Completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  const statusHandler = (value: FilterValuesType) => {
    setTaskValue(value)
  }

  const deleteHandler = (id: number) => {
    let resultTasks = tasks.filter(task => task.id != id)
    setTasks(resultTasks)
  }

  const changeStatusHandler = (id: number) => {
    const newStatus = tasks.map(task => {
      if(id === task.id) {
        return {
          ...task,
          isDone: !task.isDone
        }
      }
      return task
    })
    // const newStatus = tasks.map(task => id === task.id ? {...task, isDone: !task.isDone  }: task)
    // console.log(newStatus)
    setTasks(newStatus)
  }

  const onChangeInputHandler = (value: string) => {
    setInputValue(value)
  }

  const createTaskHandler = () => {
    const newTask = {
      id: Math.floor((Math.random() * 1000) + 1),
      title: inputValue,
      isDone: false
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="App">
      <TodoList
        header={header}
        tasks={filteredTasks}
        deleteHandler={deleteHandler}
        statusHandler={statusHandler}
        changeStatusHandler={changeStatusHandler}
        onChangeInputHandler={onChangeInputHandler}
        inputValue={inputValue}
        createTaskHandler={createTaskHandler}
      />
    </div>
  );
}

export default App;
