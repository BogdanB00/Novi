import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import { useTasks } from './hooks/useTasks.js'

export default function App() {
  const { tasks, loading, error, reload, addTask, toggleTask, deleteTask } =
    useTasks()

  const doneCount = tasks.filter((t) => t.done).length

  return (
    <main className="app">
      <Header total={tasks.length} done={doneCount} />
      <TaskForm onAdd={addTask} />
      {error && (
        <div className="error" role="alert">
          <span>{error}</span>
          <button onClick={reload}>Pokušaj ponovo</button>
        </div>
      )}
      {loading ? (
        <p className="muted empty">Učitavanje...</p>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </main>
  )
}
