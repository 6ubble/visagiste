import React from 'react'

interface SuccessModalProps {
  onClose: () => void
}

function SuccessModal({ onClose }: SuccessModalProps): React.JSX.Element {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border-2 border-gray-600 shadow-2xl">
        <div className="text-center">
          {/* Иконка успеха */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-400/20 mb-6">
            <div className="h-8 w-8 text-yellow-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Заголовок */}
          <h3 className="text-2xl font-bold text-white mb-4">
            Заявка отправлена!
          </h3>
          
          {/* Сообщение */}
          <p className="text-gray-300 mb-8 leading-relaxed">
            Я получила вашу заявку и свяжусь с вами в ближайшее время для уточнения деталей
          </p>
          
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 w-full"
          >
            <span className="relative z-10">Отлично!</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
