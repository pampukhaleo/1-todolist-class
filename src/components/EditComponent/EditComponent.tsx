import React, { ChangeEvent, useState } from 'react'
import './editComponent.css'
import { Button } from '../Button/Button';

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
      <input value={ inputValue }
             type="text"
             onChange={ onChangeHandler }
             onKeyDown={ onKeyDownPress }
             className={ error ? 'error' : '' }/>
      <Button name={ 'Edit' } callBack={ clickEditButtonHandler }/>
      <Button name={ 'Close' } callBack={ closeInput }/>
      { error && <div className="error-message">{ error }</div> }
    </div>
  )
}
