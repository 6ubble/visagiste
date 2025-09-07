import { GALLERY_IMAGES } from './constants.ts'

interface GalleryModalProps {
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onSelectImage: (index: number) => void
}

// Модальное окно галереи
function GalleryModal({ isOpen, currentIndex, onClose, onNext, onPrev, onSelectImage }: GalleryModalProps): React.JSX.Element {
  if (!isOpen) return <></>

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-300"
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
              onPrev()
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-300"
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
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                onSelectImage(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryModal
