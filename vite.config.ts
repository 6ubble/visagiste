import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  build: {
    // Оптимизация сборки
    rollupOptions: {
      output: {
        manualChunks: {
          // Выносим vendor библиотеки в отдельный chunk
          vendor: ['react', 'react-dom'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup']
        }
      }
    },
    
    // Уменьшаем размер chunks
    chunkSizeWarningLimit: 1000,
    
    // Минификация
    minify: 'terser'
  },
  
  // Оптимизация dev сервера
  server: {
    host: true,
    port: 5173
  },
})