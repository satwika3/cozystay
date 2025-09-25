import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cozystay/', // ⚠️ Ensure this has trailing slash
  
  build: {
    // Add this to ensure proper asset handling
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})