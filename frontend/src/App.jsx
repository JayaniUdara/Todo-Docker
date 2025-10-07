import React, { useEffect, useState } from 'react'
import { listTasks, createTask, completeTask } from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = async () => {
    try {
      setLoading(true)
      setTasks(await listTasks())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const onAdd = async (title, description) => {
    await createTask({ title, description })
    await refresh()
  }

  const onDone = async (id) => {
    await completeTask(id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="wrap">
      <div className="panel">
        <h3>Add a Task</h3>
        <TaskForm onAdd={onAdd}/>
      </div>
      <div className="divider" />
      <div className="panel">
        <h3>Latest</h3>
        {error && <div className="error">{error}</div>}
        {loading ? <div>Loading…</div> :
          <TaskList tasks={tasks} onDone={onDone} />
        }
      </div>
    </div>
  )
}
