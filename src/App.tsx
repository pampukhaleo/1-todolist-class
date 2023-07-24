import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
  const header = 'What to learn'

  const [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ])

  const [inputValue, setInputValue] = useState('')

  const deleteHandler = (id: number) => setTasks(tasks.filter(task => task.id != id))

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
        tasks={tasks}
        deleteHandler={deleteHandler}
        changeStatusHandler={changeStatusHandler}
        onChangeInputHandler={onChangeInputHandler}
        inputValue={inputValue}
        createTaskHandler={createTaskHandler}
      />
    </div>
  );
}

export default App;
