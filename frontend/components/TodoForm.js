'use client'

import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      await onAdd(title.trim())
      setTitle('')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche..."
        disabled={loading}
        style={{
          flex: 1,
          padding: '10px 14px',
          fontSize: '16px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#adb5bd' : '#4f8ef7',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {loading ? '...' : 'Ajouter'}
      </button>
    </form>
  )
}