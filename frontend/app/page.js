'use client'

import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../lib/todoApi'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

export default function Home() {

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  useEffect(() => {
    loadTodos()
  }, [])

  async function loadTodos() {
    try {
      setLoading(true)
      setError(null)
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      setError('Impossible de charger les tâches. Le backend est-il lancé ?')
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(title) {
    setActionError(null)
    try {
      const nouvelleTache = await createTodo(title)
      setTodos([nouvelleTache, ...todos])
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleToggle(id, done) {
    setActionError(null)
    try {
      const tacheMiseAJour = await updateTodo(id, done)
      setTodos(todos.map(todo =>
        todo.id === id ? tacheMiseAJour : todo
      ))
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleDelete(id) {
    setActionError(null)
    try {
      await deleteTodo(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <main style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'system-ui, sans-serif',
    }}>

      <h1 style={{ marginBottom: '8px', color: '#212529' }}>
        Mes tâches
      </h1>

      <p style={{ color: '#6c757d', marginBottom: '24px', fontSize: '14px' }}>
        {todos.length} tâche{todos.length !== 1 ? 's' : ''}
        {' · '}
        {todos.filter(t => t.done).length} terminée{todos.filter(t => t.done).length !== 1 ? 's' : ''}
      </p>

      <TodoForm onAdd={handleAdd} />

      {actionError && (
        <p style={{
          color: '#dc3545',
          backgroundColor: '#fff5f5',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ffc9c9',
          marginBottom: '16px',
          fontSize: '14px',
        }}>
          {actionError}
        </p>
      )}

      {loading && (
        <p style={{ color: '#6c757d', textAlign: 'center' }}>
          Chargement...
        </p>
      )}

      {error && (
        <p style={{
          color: '#dc3545',
          backgroundColor: '#fff5f5',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ffc9c9',
        }}>
          {error}
        </p>
      )}

      {!loading && !error && todos.length === 0 && (
        <p style={{ color: '#adb5bd', textAlign: 'center', padding: '40px 0' }}>
          Aucune tâche pour l&apos;instant. Ajoutes-en une !
        </p>
      )}

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}

    </main>
  )
}