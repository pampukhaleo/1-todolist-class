import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from '../Button/Button';

type PropsType = {
  addTask: (text: string) => void
  addFormName: string
}
export const AddForm = ({ addTask, addFormName }: PropsType) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null);

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const inputEditValueHandler = () => {
    addTaskHandler()
  }

  const onKeyDownCreateInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (inputValue.trim() === '') {
      setError('Field is required')
      setInputValue('')
      return
    }
    addTask(inputValue.trim())
    setInputValue('')
  }

  return (
    <div>
      <h4>{ addFormName }</h4>
      <input
        onChange={ onChangeInputHandler }
        onKeyDown={ onKeyDownCreateInputHandler }
        value={ inputValue }
        className={ error ? 'error' : '' }
      />
      <Button name={ '+' } callBack={ inputEditValueHandler }/>
      { error && <div className="error-message">{ error }</div> }
    </div>
  )
}
