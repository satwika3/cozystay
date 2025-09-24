import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Force React to run on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8084', // Your Spring Boot port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})