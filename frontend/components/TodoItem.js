'use client'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      marginBottom: '8px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      }}>

      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, !todo.done)}
        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
      />

      <span style={{
        flex: 1,
        fontSize: '16px',
        textDecoration: todo.done ? 'line-through' : 'none',
        color: todo.done ? '#adb5bd' : '#212529',
      }}>
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: 'none',
          border: '1px solid #dee2e6',
          borderRadius: '6px',
          padding: '4px 10px',
          cursor: 'pointer',
          color: '#dc3545',
          fontSize: '14px',
        }}
      >
        Supprimer
      </button>

    </div>
  )
}
