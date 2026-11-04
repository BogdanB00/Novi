import { useEffect, useState } from 'react'
import { tasksApi } from '../api/tasks.js'

function errorMessage(err) {
  return err instanceof TypeError
    ? 'Backend nije dostupan. Da li je pokrenut (dotnet run u folderu backend)?'
    : err.message
}

// Ucitava zadatke sa backenda i nudi funkcije za izmenu.
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Prvo ucitavanje pri otvaranju stranice
  useEffect(() => {
    let ignore = false
    tasksApi
      .list()
      .then((data) => !ignore && setTasks(data))
      .catch((err) => !ignore && setError(errorMessage(err)))
      .finally(() => !ignore && setLoading(false))
    return () => {
      ignore = true
    }
  }, [])

  async function run(action) {
    setError(null)
    try {
      await action()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  const reload = () =>
    run(async () => {
      setTasks(await tasksApi.list())
      setLoading(false)
    })

  const addTask = (text) =>
    run(async () => {
      const task = await tasksApi.create(text)
      setTasks((prev) => [...prev, task])
    })

  const toggleTask = (id) =>
    run(async () => {
      const current = tasks.find((t) => t.id === id)
      if (!current) return
      const updated = await tasksApi.update(id, { done: !current.done })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    })

  const deleteTask = (id) =>
    run(async () => {
      await tasksApi.remove(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    })

  return { tasks, loading, error, reload, addTask, toggleTask, deleteTask }
}
