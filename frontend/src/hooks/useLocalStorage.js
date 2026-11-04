import { useEffect, useState } from 'react'

// Kao useState, ali vrednost cuva u localStorage-u da prezivi osvezavanje stranice.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage nije dostupan (npr. privatni prozor) - aplikacija radi i bez njega
    }
  }, [key, value])

  return [value, setValue]
}
