import { useState, useCallback, memo, useEffect } from 'react'
import { GALLERY_IMAGES } from './constants.ts'
import type { GalleryProps, GalleryImage } from './types.ts'

// Мемоизированный Gallery компонент
const Gallery = memo(({}: GalleryProps): React.JSX.Element => {
  // Определяем слабые устройства для отключения анимаций
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Проверяем производительность устройства
    const checkDevicePerformance = () => {
      const isMobile = window.innerWidth < 768
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
      const isSlowConnection = (navigator as any).connection && (navigator as any).connection.effectiveType === 'slow-2g'
      
      setIsLowEndDevice(isMobile || isLowMemory || isSlowConnection)
    }

    checkDevicePerformance()
    window.addEventListener('resize', checkDevicePerformance)
    
    return () => window.removeEventListener('resize', checkDevicePerformance)
  }, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Переход к следующему изображению
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  }, [])

  // Переход к предыдущему изображению
  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }, [])

  // Открытие модального окна
  const openModal = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }, [])

  // Закрытие модального окна
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Обработка клавиш
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'Escape') closeModal()
  }, [prevImage, nextImage, closeModal])

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Портфолио
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Посмотрите на результаты нашей работы
          </p>
        </div>

        {/* Сетка изображений - оптимизированная */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {GALLERY_IMAGES.map((image: GalleryImage, index: number) => (
            <div
              key={image.id}
              className={`group relative aspect-square overflow-hidden rounded-2xl cursor-pointer ${!isLowEndDevice ? 'transform hover:scale-105 transition-all duration-300' : ''}`}
              onClick={() => openModal(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModal(index)
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover ${!isLowEndDevice ? 'transition-transform duration-500 group-hover:scale-110' : ''}`}
                loading="lazy"
              />
              
              {/* Overlay при наведении - только на мощных устройствах */}
              {!isLowEndDevice && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Модальное окно с просмотром */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Изображение */}
            <div className="relative">
              <img
                src={GALLERY_IMAGES[currentIndex].src}
                alt={GALLERY_IMAGES[currentIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />

              {/* Кнопки навигации */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Предыдущее изображение"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Следующее изображение"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Счетчик изображений */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                {currentIndex + 1} из {GALLERY_IMAGES.length}
              </p>
            </div>

            {/* Миниатюры */}
            <div className="flex justify-center space-x-2 mt-6">
              {GALLERY_IMAGES.map((_: GalleryImage, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-400' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Перейти к изображению ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

export default Gallery