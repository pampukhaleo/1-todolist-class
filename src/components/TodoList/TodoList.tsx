import React, { ChangeEvent, useState } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../Button/Button';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';
import { FilterValuesType, Task } from '../../App';
import { AddForm } from '../AddForm/AddForm';

type PropsType = {
  tasks: () => Task[]
  removeTask: (id: string, todoListId: string) => void
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void
  createTask: (taskValue: string, todoListId: string) => void
  editTask: (title: string, todoListId: string) => void
  disabled: boolean
  disableHandler: (id: string, todoListId: string) => void
  taskInputInitialValue: string
  closeEditInput: (todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  todoListId: string
  taskFilterStatus: string
  deleteTodoList: (todoListId: string) => void
  editTodoListTitle: (value: string, todoListId: string) => void
  todoListInitialValue: string
}

const TodoList = ({
                    tasks,
                    createTask,
                    changeStatus,
                    removeTask,
                    editTask,
                    disabled,
                    disableHandler,
                    taskInputInitialValue,
                    closeEditInput,
                    changeFilter,
                    todoListId,
                    taskFilterStatus,
                    deleteTodoList,
                    editTodoListTitle,
                    todoListInitialValue
                  }: PropsType) => {

  const [showTitleInput, setShowTitleInput] = useState(false);

  //task
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

  //todolist
  const onClickSetTodolistTitle = (value: string) => {
    editTodoListTitle(value, todoListId)
    setShowTitleInput(false)
  }
  const onDeleteTodoListHandler = () => {
    deleteTodoList(todoListId)
  }
  const filterHandler = (value: FilterValuesType) => changeFilter(value, todoListId)
  const toggleTodoListTitleInput = () => {
    setShowTitleInput(!showTitleInput)
  }

  return (
    <div>
      {
        showTitleInput
          ? <EditComponent closeInput={ toggleTodoListTitleInput }
                           onClickEditHandler={ onClickSetTodolistTitle }
                           initialValue={ todoListInitialValue }/>
          : <h2 onClick={ toggleTodoListTitleInput }>{ todoListInitialValue }
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
            <input onChange={ (e) => onChangeStatusTaskHandler(e, task.id) }
                   type="checkbox"
                   checked={ task.isDone }/>
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
      { !disabled && <EditComponent closeInput={ () => closeEditInput(todoListId) }
                                    onClickEditHandler={ onClickEditTaskHandler }
                                    initialValue={ taskInputInitialValue }/> }
    </div>
  )
}

export default TodoList
