import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ui/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': '/src/components',
      '@/utils': '/src/utils',
      '@/hooks': '/src/hooks',
      '@/store': '/src/store',
      '@/api': '/src/api',
    },
  },
})
