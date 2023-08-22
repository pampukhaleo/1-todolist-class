import React, { ChangeEvent, useState } from 'react'
import './editComponent.css'
import { Button } from '../Button/Button';

type PropsType = {
  onClickEditHandler: (title: string) => void
  editValue: string
  closeEditInput: () => void

}

export const EditComponent = ({ closeEditInput, onClickEditHandler, editValue }: PropsType) => {
  const [inputValue, setInputValue] = useState(editValue);
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
             onChange={ onChangeHandler }
             type="text"
             onKeyDown={ onKeyDownPress }/>
      { error && error }
      <Button name={ 'Edit' } callBack={ clickEditButtonHandler }/>
      <Button name={ 'Close' } callBack={ () => closeEditInput() }/>
    </div>
  )
}
