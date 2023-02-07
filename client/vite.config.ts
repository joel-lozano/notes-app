import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/notes-app/' : undefined,
  plugins: [react()],
  server: {
    proxy: {
      '/notes': 'http://localhost:3000'
    },
  },
});
