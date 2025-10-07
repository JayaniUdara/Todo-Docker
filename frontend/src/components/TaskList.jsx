import React from 'react'

export default function TaskList({ tasks, onDone }) {
  if (!tasks.length) return <div>No tasks yet.</div>

  return (
    <div className="stack">
      {tasks.map(t => (
        <div key={t.id} className="task">
          <div className="task-main">
            <div className="task-title">{t.title}</div>
            {t.description && <div className="task-desc">{t.description}</div>}
          </div>
          <button onClick={() => onDone(t.id)} className="pill">Done</button>
        </div>
      ))}
    </div>
  )
}
