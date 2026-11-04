import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('zadaci', [])

  function addTask(text) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const doneCount = tasks.filter((t) => t.done).length

  return (
    <main className="app">
      <Header total={tasks.length} done={doneCount} />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}
