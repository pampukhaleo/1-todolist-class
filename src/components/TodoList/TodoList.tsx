import React, { ChangeEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';
import { FilterValuesType, Task } from '../../App';
import { AddForm } from '../AddForm/AddForm';

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

  const [todolistTitleValue, setTodolistTitleValue] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);

  const filterHandler = (value: FilterValuesType) => changeFilter(value, todoListId)

  const deleteTaskHandler = (id: string) => {
    removeTask(id, todoListId)
  }

  const addTask = (text: string) => {
    createTask(text, todoListId)
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
          ? <h2>Change Title
            <input type="text" value={ todolistTitleValue }
                   onChange={ onChangeTodolistTitleValue }
                   onBlur={ onBlurSetTodolistTitle }/>
          </h2>
          : <h2 onClick={ () => setShowTitleInput(true) }>{ header }
            <IconButton
              onClick={ onDeleteTodoListHandler }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon/>
            </IconButton>
          </h2>
      }
      <AddForm addTask={ addTask } addFormName={ 'Add Task' }/>
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
