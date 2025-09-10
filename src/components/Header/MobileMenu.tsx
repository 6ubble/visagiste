import { useEffect } from 'react'
import type { MobileMenuProps } from './types'
import { CONTACT_INFO } from '../Hero/constants'

function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps): React.JSX.Element {
  // Блокируем скролл на body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 backdrop-blur-lg transform transition-transform duration-500 ease-in-out z-[60] ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      
      <div className="h-full flex flex-col relative z-10">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-3xl font-bold text-white tracking-wide">Меню</h3>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center transition-colors duration-300 hover:bg-white/10 rounded-full"
            aria-label="Закрыть меню"
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <span className="block h-0.5 w-6 bg-white transform rotate-45 absolute"></span>
              <span className="block h-0.5 w-6 bg-white transform -rotate-45 absolute"></span>
            </div>
          </button>
        </div>
        
        <div className="flex-1 py-8 px-6 flex flex-col justify-center items-center space-y-10">
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          
          <button
            onClick={() => scrollToSection('prices')}
            className="text-white font-medium text-3xl tracking-wide"
          >
            Прайс-лист
          </button>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          
          <button
            onClick={() => scrollToSection('training')}
            className="text-white font-medium text-3xl tracking-wide"
          >
            Обучение
          </button>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          
          <button
            onClick={() => scrollToSection('order')}
            className="text-white font-medium text-3xl tracking-wide"
          >
            Записаться
          </button>
        </div>
        
        <div className="p-8 border-t border-white/10 text-center">
          {/* Адрес */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-yellow-400"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-gray-300 font-medium text-lg text-center">
              {CONTACT_INFO.address}
            </span>
          </div>
          
          <div className="space-y-4 mb-6">
            <a href="tel:+79526005126" className="block text-3xl font-bold text-white hover:text-yellow-400 transition-colors duration-300 tracking-wide">
              +7 952 600-51-26
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
