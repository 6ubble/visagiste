import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Простая и эффективная конфигурация кэширования
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Кэшируем на сутки
      staleTime: 1000 * 60 * 60 * 24, // 24 часа
      gcTime: 1000 * 60 * 60 * 24 * 3, // 3 дня в памяти
      
      // Не рефетчим статичные изображения
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      
      // Повторные попытки
      retry: 2
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)