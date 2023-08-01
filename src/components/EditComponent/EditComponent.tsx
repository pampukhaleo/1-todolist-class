import React, { ChangeEvent, useState } from 'react'
import './editComponent.css'
import { Button } from '../Button/Button';

type PropsType = {
  onClickEditHandler: (title: string) => void
}

export const EditComponent = ({ onClickEditHandler }: PropsType) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  return (
    <div className={ 'container' }>
      <input value={ inputValue }
             onChange={ onChangeHandler }
             type="text"/>
      <Button name={'Edit'} callBack={() => onClickEditHandler(inputValue)} />
    </div>
  )
}
