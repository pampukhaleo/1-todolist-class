import React, { useState } from 'react'
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type FilterValuesType = 'All' | 'Completed' | 'Active'

type PropsType = {
  header: string
  tasks: Task[]
  deleteHandler: (id: number) => void
  changeStatusHandler: (id: number) => void
  onChangeInputHandler: (value: string) => void
  inputValue: string
  createTaskHandler: () => void
}

type Task = {
  id: number
  title: string
  isDone: boolean
}

const TodoList = ({header,
                    tasks,
                    deleteHandler,
                    changeStatusHandler,
                    onChangeInputHandler,
                    inputValue,
                    createTaskHandler}:PropsType) => {

  const [taskValue, setTaskValue] = useState<FilterValuesType>('All')

  const filterFoo = () => {
    let filteredTasks = tasks
    switch (taskValue) {
      case 'Active': {
        return filteredTasks = tasks.filter(task => !task.isDone)
      }
      case 'Completed': {
        return filteredTasks = tasks.filter(task => task.isDone)
      }
      default: {
        return filteredTasks
      }
    }
  }

  const statusHandler = (value: FilterValuesType) => setTaskValue(value)

  return (
    <div>
      <h3>{header}</h3>
      <div>
        <input
          onChange={(event) => onChangeInputHandler(event.target.value)}
          value={inputValue}
        />
        <button onClick={createTaskHandler}>+</button>
      </div>
      <ul>
        {filterFoo()?.map(task => (
          <li key={task.id}>
            <input onChange={() => changeStatusHandler(task.id)} type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            <IconButton
              onClick={ () => deleteHandler(task.id) }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={ () => statusHandler('All') }>All</button>
        <button onClick={ () => statusHandler('Active') }>Active</button>
        <button onClick={ () => statusHandler('Completed') }>Completed</button>
      </div>
    </div>
  )
}

export default TodoList
