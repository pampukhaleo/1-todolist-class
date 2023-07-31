import React from 'react'

type PropsType = {
  name: string
  callBack: () => void
}

export const Button = ({ name, callBack }: PropsType) => {

  const onclickHandler = () => {
    callBack()
  }

  return (
    <button onClick={ onclickHandler }>
      { name }
    </button>
  )
}
