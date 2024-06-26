import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3009,
    proxy: {
      '/api': {
        target: 'http://localhost:3008', // Make sure your backend server is running on this port
        changeOrigin: true,
        // ^ This should point to the base URL of your backend API
      },
    }
  },
})
