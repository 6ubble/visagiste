import type { NavigationProps } from './types'

function Navigation({ scrollToSection }: NavigationProps): React.JSX.Element {
  const textColor = 'text-white'
  const hoverBorder = 'hover:border-yellow-400/50'
  
  return (
    <div className="flex items-center justify-between w-full">
      {/* Левая навигация - скрыта на мобильных, видна на md+ */}
      <nav className="hidden md:flex space-x-8">
        <button 
          onClick={() => scrollToSection('prices')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-6 py-3 border border-transparent rounded-xl`}
        >
          Прайс-лист
        </button>
        <button 
          onClick={() => scrollToSection('training')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-6 py-3 border border-transparent rounded-xl`}
        >
          Обучение
        </button>
        <button 
          onClick={() => scrollToSection('order')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-6 py-3 border border-transparent rounded-xl`}
        >
          Записаться
        </button>
      </nav>

      {/* Номера телефонов - видимы на всех устройствах */}
      <div className="flex flex-col items-end space-y-3">
        <a href="tel:+79526005126" className="flex items-center space-x-3 group">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
          <div className={`text-xl md:text-2xl font-bold ${textColor} group-hover:text-yellow-400 transition-colors duration-300 tracking-wide`}>
            +7 952 600-51-26
          </div>
        </a>
      </div>
    </div>
  )
}

export default Navigation
