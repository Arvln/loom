import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../..'),
      '@admin-frontend': path.resolve(__dirname, '.'),
      '@workspace/ui': path.resolve(__dirname, '../ui/src'),
    },
  },
  build: {
    outDir: 'dist/admin',
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['admin-web'],
    port: 5173,
  },
})
