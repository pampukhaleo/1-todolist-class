import React, { MouseEvent } from 'react'

type PropsType = {
  name: string
  callBack: (event: MouseEvent<HTMLElement>) => void
  status?: boolean
}

export const Button = ({ name, callBack, status }: PropsType) => {

  const onclickHandler = (event: MouseEvent<HTMLElement>) => {
    callBack(event)
  }

  return (
    <button className={ status === true ? 'active-button' : '' }
            onClick={ onclickHandler }>
      { name }
    </button>
  )
}
