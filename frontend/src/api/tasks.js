// Svi pozivi ka backendu na jednom mestu.
// U razvoju Vite prosledjuje /api na http://localhost:3001 (vidi vite.config.js).
const BASE = '/api/tasks'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      body.error ||
        (res.status >= 500
          ? 'Backend nije dostupan ili je došlo do greške na serveru. Da li je pokrenut (dotnet run u folderu backend)?'
          : `Greška ${res.status}`),
    )
  }
  return res.status === 204 ? null : res.json()
}

export const tasksApi = {
  list: () => request(BASE),
  create: (text) =>
    request(BASE, { method: 'POST', body: JSON.stringify({ text }) }),
  update: (id, changes) =>
    request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  remove: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
}
