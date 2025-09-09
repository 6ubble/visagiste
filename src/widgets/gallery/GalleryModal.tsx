import { GALLERY_BLOCKS } from './constants.ts'
import { useState, useEffect, useMemo } from 'react'

interface GalleryModalProps {
  isOpen: boolean
  currentIndex: number
  currentBlockId: string | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

// Модальное окно галереи
function GalleryModal({ isOpen, currentIndex, currentBlockId, onClose, onNext, onPrev }: GalleryModalProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const currentBlock = useMemo(() => GALLERY_BLOCKS.find(b => b.id === currentBlockId) || null, [currentBlockId])
  const totalInBlock = currentBlock ? currentBlock.images.length : 0

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setImageLoaded(false)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    setImageLoaded(false)
  }, [currentIndex, currentBlockId])

  if (!isOpen || !currentBlock) return <></>

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div className={`relative max-w-6xl max-h-[95vh] w-full transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Изображение */}
        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-3xl p-4 shadow-2xl border border-white/10">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={currentBlock.images[currentIndex].src}
            alt={currentBlock.images[currentIndex].alt}
            className={`w-full h-auto max-h-[75vh] object-contain rounded-2xl transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Кнопки навигации */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/15 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl border border-white/10 group"
          >
            <svg className="w-7 h-7 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-l from-white/15 to-white/5 hover:from-white/25 hover:to-white/15 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl border border-white/10 group"
          >
            <svg className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Счетчик изображений по блоку */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-white font-medium text-lg">
              <span className="text-yellow-400 font-bold">{currentIndex + 1}</span>
              <span className="text-white/70 mx-2">из</span>
              <span className="text-white/90">{totalInBlock}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GalleryModal
