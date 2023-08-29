import React, { ChangeEvent, useState } from 'react'
import { Button, IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonMUI from '@mui/material/Button';
import { EditComponent } from '../EditComponent/EditComponent';
import { FilterValuesType, Task } from '../../App';
import { AddForm } from '../AddForm/AddForm';
import { Checkbox } from '@mui/material';

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
          : <Typography variant='h5'
                        align='center'
                        gutterBottom
                        sx={{fontWeight: 'bold'}}
                        onClick={ toggleTodoListTitleInput }>{ todoListInitialValue }
            <IconButton
              onClick={ onDeleteTodoListHandler }
              aria-label="delete"
              size="large"
            >
              <DeleteIcon/>
            </IconButton>
          </Typography>
      }
      <AddForm addTask={ addTask } />
      <List>
        { tasks().map(task => {
          const onChangeStatusTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const isDone = event.currentTarget.checked
            changeStatus(task.id, isDone, todoListId)
          }

          return <ListItem key={ task.id }
                           sx={{display: 'flex', justifyContent: 'space-evenly'}}
                           disablePadding
                           divider
                           className={ task.isDone ? 'grey-text' : '' }>
            <Checkbox onChange={ onChangeStatusTaskHandler }
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
          </ListItem>

        }) }
      </List>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button variant="contained"
                color={ taskFilterStatus === 'All' ? 'secondary' : 'primary' }
                size="medium"
                disableElevation
                onClick={ () => filterHandler('All') }
                sx={ { mr: '2px' } }>
          All
        </Button>
        <Button variant="contained"
                color={ taskFilterStatus === 'Active' ? 'secondary' : 'primary' }
                size="medium"
                disableElevation
                onClick={ () => filterHandler('Active') }
                sx={ { mr: '2px' } }>
          Active
        </Button>
        <Button variant="contained"
                color={ taskFilterStatus === 'Completed' ? 'secondary' : 'primary' }
                size="medium"
                disableElevation
                onClick={ () => filterHandler('Completed') }>
          Completed
        </Button>
      </div>
      { !disabled && <EditComponent closeInput={ () => closeEditInput(todoListId) }
                                    onClickEditHandler={ onClickEditTaskHandler }
                                    initialValue={ taskInputInitialValue }/> }
    </div>
  )
}

export default TodoList
