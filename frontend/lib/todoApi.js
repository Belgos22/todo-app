const API_URL = process.env.NEXT_PUBLIC_API_URL

// Récupérer toutes les tâches
export async function getTodos() {
  const response = await fetch(`${API_URL}/todos`)
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des tâches')
  }
  return response.json()
}

// Créer une nouvelle tâche
export async function createTodo(title) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la création de la tâche')
  }
  return response.json()
}

// Modifier le statut done d'une tâche
export async function updateTodo(id, done) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done }),
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la modification de la tâche')
  }
  return response.json()
}

// Supprimer une tâche
export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la tâche')
  }
}