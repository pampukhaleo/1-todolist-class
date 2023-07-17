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

  let filteredTasks = tasks
  if (taskValue === 'Completed') {
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

  return (
    <div className="App">
      <TodoList
        header={header}
        tasks={filteredTasks}
        deleteHandler={deleteHandler}
        statusHandler={statusHandler}
      />
    </div>
  );
}

export default App;
