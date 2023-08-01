import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';

type FilterValuesType = 'All' | 'Completed' | 'Active'

type PropsType = {
  header: string
  tasks: Task[]
  removeTask: (id: string) => void
  changeStatus: (id: string) => void
  createTask: (taskValue: string) => void
  changeDisableStatus: () => void
  disabled: boolean
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
                    removeTask,
                    changeDisableStatus,
                    disabled
                  }: PropsType) => {

  const [taskStatus, setTaskStatus] = useState<FilterValuesType>('All')
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null);

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

  const deleteHandler = (id: string) => {
    removeTask(id)
  }

  const addTaskHandler = () => {
    if (inputValue.trim() === '') {
      return
    }
    createTask(inputValue.trim())
    setInputValue('')
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const inputValueHandler = () => {
    addTaskHandler()
  }

  const disabledHandler = () => {
    changeDisableStatus()
  }

  const onChangeHandler = (id: string) => {
    changeStatus(id)
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
        <Button name={ '+' } callBack={ inputValueHandler }/>
      </div>
      <ul>
        { filterStatus()?.map(task => (
          <li key={ task.id }>
            <input onChange={ () => onChangeHandler(task.id) } type="checkbox" checked={ task.isDone }/>
            <span>{ task.title }</span>
            <IconButton
              onClick={ () => deleteHandler(task.id) }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon/>
            </IconButton>
            {/*<ButtonMUI onClick={disabledHandler} disabled={disabled}>Primary</ButtonMUI>*/}
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
