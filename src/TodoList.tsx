import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from './components/Button/Button';

type FilterValuesType = 'All' | 'Completed' | 'Active'

type PropsType = {
  header: string
  tasks: Task[]
  removeTask: (id: string) => void
  changeStatus: (id: string) => void
  createTask: (taskValue: string) => void
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

const TodoList = ({
                    header,
                    tasks,
                    createTask,
                    changeStatus,
                    removeTask
                  }: PropsType) => {

  const [taskStatus, setTaskStatus] = useState<FilterValuesType>('All')
  const [inputValue, setInputValue] = useState('')

  const filterStatus = () => {
    let filteredTasks = tasks
    switch (taskStatus) {
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

  const statusHandler = (value: FilterValuesType) => setTaskStatus(value)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  // const deleteHandler = (id: string) => {
  //   removeTask(id)
  // }

  const inputValueHandler = () => {
    createTask(inputValue)
    setInputValue('')
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputValueHandler()
    }
  }

  const addTaskHandler = () => {
    inputValueHandler()
  }

  return (
    <div>
      <h3>{ header }</h3>
      <div>
        <input
          onChange={ onChangeInputHandler }
          onKeyDown={ onKeyDownHandler }
          value={ inputValue }
        />
        <Button name={ '+' } callBack={ addTaskHandler }/>
      </div>
      <ul>
        { filterStatus()?.map(task => (
          <li key={ task.id }>
            <input onChange={ () => changeStatus(task.id) } type="checkbox" checked={ task.isDone }/>
            <span>{ task.title }</span>
            <IconButton
              onClick={ () => removeTask(task.id) }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon/>
            </IconButton>
          </li>
        )) }
      </ul>
      <div>
        <Button callBack={ () => statusHandler('All') } name={ 'All' }/>
        <Button callBack={ () => statusHandler('Active') } name={ 'Active' }/>
        <Button callBack={ () => statusHandler('Completed') } name={ 'Completed' }/>
      </div>
    </div>
  )
}

export default TodoList
