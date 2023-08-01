import React from 'react'

type PropsType = {
  name: string
  callBack: () => void
  status?: boolean
}

export const Button = ({ name, callBack, status }: PropsType) => {

  const onclickHandler = () => {
    callBack()
  }

  return (
    <button className={ status === true ? 'active-button' : '' }
            onClick={ onclickHandler }>
      { name }
    </button>
  )
}
