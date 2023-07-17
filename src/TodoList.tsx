import React from 'react'

type PropsType = {
  header?: string
  tasks?: Task[]
}

type Task = {
  id: number
  title: string
  isDone: boolean
}

const TodoList = ({header, tasks}:PropsType) => {
  return (
    <div>
      <h3>{header}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasks?.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}

export default TodoList
