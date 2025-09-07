import React from 'react'

interface SuccessModalProps {
  onClose: () => void
}

function SuccessModal({ onClose }: SuccessModalProps): React.JSX.Element {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-gray-200 shadow-2xl">
        <div className="text-center">
          {/* Иконка успеха */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
            <div className="h-6 w-6 text-green-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Заголовок */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Запись оформлена!
          </h3>
          
          {/* Сообщение */}
          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
            Мы получили вашу запись и свяжемся с вами в ближайшее время
          </p>
          
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 focus:outline-none text-sm"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
