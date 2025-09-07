import React, { memo, useCallback, useEffect } from 'react'

interface SuccessModalProps {
  onClose: () => void
}

// МЕМОИЗИРУЕМ модалку
const SuccessModal = memo(({ onClose }: SuccessModalProps): React.JSX.Element => {
  
  // МЕМОИЗИРУЕМ обработчик клавиш
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // МЕМОИЗИРУЕМ клик по backdrop
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  // Обработка Escape при монтировании
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    // Блокируем скролл body
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-gray-200 shadow-2xl transform animate-slideUp">
        <div className="text-center">
          {/* Иконка успеха с анимацией */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3 animate-scaleIn">
            <div className="h-6 w-6 text-green-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="animate-checkmark">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Заголовок */}
          <h3 id="success-title" className="text-xl font-bold text-gray-900 mb-3">
            Запись оформлена!
          </h3>
          
          {/* Сообщение */}
          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
            Мы получили вашу запись и свяжемся с вами в ближайшее время
          </p>
          
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 text-sm transform hover:scale-105"
            autoFocus
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
})

export default SuccessModal