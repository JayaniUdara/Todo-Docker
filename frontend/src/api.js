const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function listTasks() {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function completeTask(id) {
  const res = await fetch(`${API}/tasks/${id}/complete`, { method: 'PATCH' });
  if (!res.ok && res.status !== 204) throw new Error('Failed to complete task');
}
