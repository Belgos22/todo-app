'use client'

import { useEffect, useState } from 'react'
import { getTodos } from '../lib/todoApi'

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main>
      <h1>Todo App</h1>
      <p>Nombre de tâches : {todos.length}</p>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </main>
  )
}