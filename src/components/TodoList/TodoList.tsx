import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, MouseEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';

type FilterValuesType = 'All' | 'Completed' | 'Active'

type PropsType = {
  header: string
  tasks: Task[]
  removeTask: (id: string) => void
  changeStatus: (id: string, isDone: boolean) => void
  createTask: (taskValue: string) => void
  editTask: (title: string) => void
  disabled: boolean
  disableHandler: (id: string) => void
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
                    editTask,
                    disabled,
                    disableHandler
                  }: PropsType) => {

  const [taskStatus, setTaskStatus] = useState<FilterValuesType>('All')
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null);

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
      setError('Field is required')
      setInputValue('')
      return
    }
    createTask(inputValue.trim())
    setInputValue('')
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const inputValueHandler = () => {
    addTaskHandler()
  }

  const onClickEditHandler = (title: string) => {
    editTask(title)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const isDone = event.currentTarget.checked
    changeStatus(id, isDone)
  }

  return (
    <div>
      <h3>{ header }</h3>
      <div>
        <input
          onChange={ onChangeInputHandler }
          onKeyDown={ onKeyDownHandler }
          value={ inputValue }
          className={ error ? 'error' : '' }
        />
        <Button name={ '+' } callBack={ inputValueHandler }/>
        { error && <div className="error-message">{ error }</div> }
      </div>
      <ul>
        { filterStatus()?.map(task => (
          <li key={ task.id }
              className={ task.isDone ? 'grey-text' : '' }>
            <input onChange={ (e) => onChangeHandler(e, task.id) } type="checkbox" checked={ task.isDone }/>
            <span>{ task.title }</span>
            <IconButton
              onClick={ () => deleteHandler(task.id) }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon/>
            </IconButton>
            <ButtonMUI onClick={ () => disableHandler(task.id) }>Edit Task</ButtonMUI>
          </li>
        )) }
      </ul>
      <div>
        <Button status={ taskStatus === 'All' }
                callBack={ () => statusHandler('All') }
                name={ 'All' }/>
        <Button status={ taskStatus === 'Active' }
                callBack={ () => statusHandler('Active') }
                name={ 'Active' }/>
        <Button status={ taskStatus === 'Completed' }
                callBack={ () => statusHandler('Completed') }
                name={ 'Completed' }/>
      </div>
      { !disabled && <EditComponent onClickEditHandler={ onClickEditHandler }/> }
    </div>
  )
}

export default TodoList
