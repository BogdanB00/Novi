import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Zahtevi na /api se prosledjuju backendu, pa frontend ne mora da zna njegovu adresu
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
