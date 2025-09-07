import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist/admin',
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['admin-web'],
    port: 5173,
  },
})
