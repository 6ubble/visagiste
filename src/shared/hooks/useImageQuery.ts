import { useQuery, useQueries } from '@tanstack/react-query'

// Функция загрузки изображения
const loadImage = async (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error(`Failed to load: ${src}`))
    
    // Оптимизации загрузки
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.src = src
  })
}

// Хук для загрузки одного изображения
export const useImageQuery = (src: string, options = {}) => {
  return useQuery({
    queryKey: ['image', src],
    queryFn: () => loadImage(src),
    enabled: Boolean(src), // Загружаем только если src существует
    ...options
  })
}

// Хук для предзагрузки массива изображений
export const useImagesQuery = (sources: string[]) => {
  return useQueries({
    queries: sources.map((src, index) => ({
      queryKey: ['image', src],
      queryFn: () => loadImage(src),
      enabled: Boolean(src),
      
      // Первое изображение загружаем с приоритетом
      staleTime: index === 0 ? 0 : 1000 * 60 * 60,
      
      // Retry для критических изображений
      retry: index === 0 ? 5 : 3
    }))
  })
}

// Хук специально для Hero слайдера
export const useHeroImages = (slides: { id: number; image: string }[]) => {
  const imageUrls = slides.map(slide => slide.image)
  const queries = useImagesQuery(imageUrls)
  
  // Состояние загрузки для каждого изображения
  const loadedImages = new Set(
    queries
      .map((query, index) => query.isSuccess ? index : null)
      .filter(index => index !== null) as number[]
  )
  
  // Общие состояния
  const isFirstImageLoaded = queries[0]?.isSuccess ?? false
  const areAllImagesLoaded = queries.every(query => query.isSuccess)
  const hasAnyError = queries.some(query => query.isError)
  
  return {
    loadedImages,
    isFirstImageLoaded,
    areAllImagesLoaded,
    hasAnyError,
    queries // Для детальной информации
  }
}