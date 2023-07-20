import React from 'react'
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {FilterValuesType} from "./App";

type PropsType = {
  header: string
  tasks: Task[]
  deleteHandler: (id: number) => void
  statusHandler: (value: FilterValuesType) => void
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
                    statusHandler,
                    changeStatusHandler,
                    onChangeInputHandler,
                    inputValue,
                    createTaskHandler}:PropsType) => {
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
        {tasks?.map(task => (
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
