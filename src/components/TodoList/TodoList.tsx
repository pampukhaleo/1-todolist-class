import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';
import { FilterValuesType, Task } from '../../App';

type PropsType = {
  header: string
  tasks: Task[]
  removeTask: (id: string, todoListId: string) => void
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void
  createTask: (taskValue: string, todoListId: string) => void
  editTask: (title: string, todoListId: string) => void
  disabled: boolean
  disableHandler: (id: string, todoListId: string) => void
  editValue: string
  disablingInput: (todoListId: string) => void
  changeCheckedStatus: (value: FilterValuesType) => void
  taskStatus: string
  todoListId: string
}

const TodoList = ({
                    header,
                    tasks,
                    createTask,
                    changeStatus,
                    removeTask,
                    editTask,
                    disabled,
                    disableHandler,
                    editValue,
                    disablingInput,
                    changeCheckedStatus,
                    taskStatus,
                    todoListId
                  }: PropsType) => {

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null);

  const statusHandler = (value: FilterValuesType) => changeCheckedStatus(value)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const deleteHandler = (id: string) => {
    removeTask(id, todoListId)
  }

  const addTaskHandler = () => {
    if (inputValue.trim() === '') {
      setError('Field is required')
      setInputValue('')
      return
    }
    createTask(inputValue.trim(), todoListId)
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
    editTask(title, todoListId)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const isDone = event.currentTarget.checked
    changeStatus(id, isDone, todoListId)
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
        { tasks.map(task => (
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
            <ButtonMUI onClick={ () => disableHandler(task.id, todoListId) }>Edit Task</ButtonMUI>
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
      { !disabled && <EditComponent disablingInput={ () => disablingInput(todoListId) }
                                    onClickEditHandler={ onClickEditHandler }
                                    editValue={ editValue }/> }
    </div>
  )
}

export default TodoList
