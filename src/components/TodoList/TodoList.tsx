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
  closeEditInput: (todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  todoListId: string
  taskFilterStatus: string
  deleteTodoList: (todoListId: string) => void
  editTodoListTitle: (value: string, todoListId: string) => void
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
                    closeEditInput,
                    changeFilter,
                    todoListId,
                    taskFilterStatus,
                    deleteTodoList,
                    editTodoListTitle
                  }: PropsType) => {

  const [inputValue, setInputValue] = useState('')
  const [todolistTitleValue, setTodolistTitleValue] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterHandler = (value: FilterValuesType) => changeFilter(value, todoListId)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const deleteTaskHandler = (id: string) => {
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

  const onKeyDownCreateInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const inputEditValueHandler = () => {
    addTaskHandler()
  }

  const onClickEditTaskHandler = (title: string) => {
    editTask(title, todoListId)
  }

  const onChangeStatusTaskHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const isDone = event.currentTarget.checked
    changeStatus(id, isDone, todoListId)
  }

  const onDeleteTodoListHandler = () => {
    deleteTodoList(todoListId)
  }

  const onChangeTodolistTitleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitleValue(event.currentTarget.value)
  }

  const onBlurSetTodolistTitle = () => {
    editTodoListTitle(todolistTitleValue, todoListId)
    setShowTitleInput(false)
  }

  return (
    <div>
      {
        showTitleInput
          ? <div>
            <input type="text" value={ todolistTitleValue }
                   onChange={ onChangeTodolistTitleValue }
                   onBlur={ onBlurSetTodolistTitle }/>
          </div>
          : <h3 onClick={ () => setShowTitleInput(true) }>{ header }</h3>
      }
      <button onClick={ onDeleteTodoListHandler }>X</button>
      <div>
        <input
          onChange={ onChangeInputHandler }
          onKeyDown={ onKeyDownCreateInputHandler }
          value={ inputValue }
          className={ error ? 'error' : '' }
        />
        <Button name={ '+' } callBack={ inputEditValueHandler }/>
        { error && <div className="error-message">{ error }</div> }
      </div>
      <ul>
        { tasks().map(task => (
          <li key={ task.id }
              className={ task.isDone ? 'grey-text' : '' }>
            <input onChange={ (e) => onChangeStatusTaskHandler(e, task.id) } type="checkbox" checked={ task.isDone }/>
            <span>{ task.title }</span>
            <IconButton
              onClick={ () => deleteTaskHandler(task.id) }
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
      { !disabled && <EditComponent closeEditInput={ () => closeEditInput(todoListId) }
                                    onClickEditHandler={ onClickEditTaskHandler }
                                    editValue={ editInputValue }/> }
    </div>
  )
}

export default TodoList
