import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  logLevel: 'error',
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: path.resolve(__dirname, 'config'),
  },
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: []
    }
  }
});
