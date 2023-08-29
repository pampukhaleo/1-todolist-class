import React, { ChangeEvent, useState } from 'react'
import './editComponent.css'
import { Button, TextField } from '@mui/material';

type PropsType = {
  onClickEditHandler: (title: string) => void
  initialValue: string
  closeInput: () => void
}

export const EditComponent = ({ closeInput, onClickEditHandler, initialValue }: PropsType) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const clickEditButtonHandler = () => {
    if (inputValue === '') {
      setError('Field is required')
    } else {
      onClickEditHandler(inputValue)
    }
  }

  const onKeyDownPress = () => {
    setError(null)
  }

  return (
    <div className={ 'container' }>
      <TextField value={ inputValue }
                 sx={ { mb: '10px' } }
                 variant="standard"
                 onChange={ onChangeHandler }
                 onKeyDown={ onKeyDownPress }
                 className={ error ? 'error' : '' }/>
      <div>
        <Button sx={ { mr: '5px', width: 25 } }
                variant="contained"
                onClick={ clickEditButtonHandler }>Save</Button>
        <Button sx={ { width: 25 } }
                variant="contained"
                onClick={ closeInput }>Close</Button>
      </div>

      { error && <div className="error-message">{ error }</div> }
    </div>
  )
}
