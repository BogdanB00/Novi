import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Novi zadatak..."
        aria-label="Novi zadatak"
      />
      <button type="submit">Dodaj</button>
    </form>
  )
}
