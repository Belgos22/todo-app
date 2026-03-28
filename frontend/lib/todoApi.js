const API_URL = process.env.NEXT_PUBLIC_API_URL

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const message = errorData.message || `Erreur ${response.status}`
    throw new Error(Array.isArray(message) ? message.join(', ') : message)
  }
  return response.json()
}

export async function getTodos() {
  const response = await fetch(`${API_URL}/todos`)
  return handleResponse(response)
}

export async function createTodo(title) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
  return handleResponse(response)
}

export async function updateTodo(id, done) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  })
  return handleResponse(response)
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Erreur ${response.status}`)
  }
}