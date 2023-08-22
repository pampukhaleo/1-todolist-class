import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';
import { FilterValuesType, Task } from '../../App';

type PropsType = {
  header: string
  tasks: () => Task[]
  removeTask: (id: string, todoListId: string) => void
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void
  createTask: (taskValue: string, todoListId: string) => void
  editTask: (title: string, todoListId: string) => void
  disabled: boolean
  disableHandler: (id: string, todoListId: string) => void
  editInputValue: string
  disablingInput: (todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  todoListId: string
  taskFilterStatus: string
  deleteTodoList: (todoListId: string) => void
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
                    editInputValue,
                    disablingInput,
                    changeFilter,
                    todoListId,
                    taskFilterStatus,
                    deleteTodoList
                  }: PropsType) => {

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null);

  const filterHandler = (value: FilterValuesType) => changeFilter(value, todoListId)

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

  const onDeleteTodoListHandler = () => {
    deleteTodoList(todoListId)
  }

  return (
    <div>
      <h3>{ header }</h3>
      <button onClick={onDeleteTodoListHandler}>X</button>
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
        { tasks().map(task => (
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
        <Button status={ taskFilterStatus === 'All' }
                callBack={ () => filterHandler('All') }
                name={ 'All' }/>
        <Button status={ taskFilterStatus === 'Active' }
                callBack={ () => filterHandler('Active') }
                name={ 'Active' }/>
        <Button status={ taskFilterStatus === 'Completed' }
                callBack={ () => filterHandler('Completed') }
                name={ 'Completed' }/>
      </div>
      { !disabled && <EditComponent disablingInput={ () => disablingInput(todoListId) }
                                    onClickEditHandler={ onClickEditHandler }
                                    editValue={ editInputValue }/> }
    </div>
  )
}

export default TodoList
