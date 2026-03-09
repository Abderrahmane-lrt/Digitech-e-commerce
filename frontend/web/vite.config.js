import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@react-bits': resolve(__dirname, './src/components/react-bits'),
      '@shared': resolve(__dirname, '../shared')
    }
  }
})
