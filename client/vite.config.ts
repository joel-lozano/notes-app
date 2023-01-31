import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/notes-app/',
  plugins: [react()],
  server: {
    proxy: {
      '/notes': 'http://localhost:3000'
      // '/notes': 'https://notes-app-jlz.azurewebsites.net'
    },
  },
});
