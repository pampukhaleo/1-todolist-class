import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';

type PropsType = {
  addTask: (text: string) => void
}
export const AddForm = ({ addTask }: PropsType) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<boolean>(false);

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const inputEditValueHandler = () => {
    addTaskHandler()
  }

  const onKeyDownCreateInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (inputValue.trim() === '') {
      setError(true)
      setInputValue('')
      return
    }
    addTask(inputValue.trim())
    setInputValue('')
  }

  return (
    <>
      <TextField
        sx={ { mr: '5px'} }
        size="small"
        onChange={ onChangeInputHandler }
        onKeyDown={ onKeyDownCreateInputHandler }
        value={ inputValue }
        error={ error }
        helperText={ error ? 'Text required' : '' }
      />
      <Button onClick={ inputEditValueHandler } variant="contained" endIcon={ <SendIcon/> }>
        Create
      </Button>
    </>
  )
}
