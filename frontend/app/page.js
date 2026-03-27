'use client'

import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../lib/todoApi'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

export default function Home() {

  // ── État ──────────────────────────────────────────
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ── Chargement initial ────────────────────────────
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

  // ── Ajouter une tâche ─────────────────────────────
  async function handleAdd(title) {
    const nouvelleTache = await createTodo(title)
    setTodos([...todos, nouvelleTache])
  }

  // ── Modifier le statut ────────────────────────────
  async function handleToggle(id, done) {
    const tacheMiseAJour = await updateTodo(id, done)
    setTodos(todos.map(todo =>
      todo.id === id ? tacheMiseAJour : todo
    ))
  }

  // ── Supprimer une tâche ───────────────────────────
  async function handleDelete(id) {
    await deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // ── Rendu ─────────────────────────────────────────
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
          Aucune tâche pour l'instant. Ajoutes-en une !
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