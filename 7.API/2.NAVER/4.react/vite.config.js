import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 사용자 -> 브라우저(React) -> Vite Proxy -> Express -> NaverAPI
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/search': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      }
    }
  }
})
