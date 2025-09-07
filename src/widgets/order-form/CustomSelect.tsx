import { useState, useRef, useEffect, memo, useCallback } from 'react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
  error?: boolean
}

// МЕМОИЗИРУЕМ CustomSelect для предотвращения лишних рендеров
const CustomSelect = memo(({ 
  value, 
  onChange, 
  options, 
  placeholder = "Выберите опцию",
  className = "",
  error = false
}: CustomSelectProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // МЕМОИЗИРУЕМ обработчики
  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleOptionSelect = useCallback((optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // МЕМОИЗИРУЕМ selectedOption
  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Кнопка-триггер */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white text-left flex items-center justify-between ${
          error 
            ? 'border-red-400 focus:border-red-400' 
            : 'border-white/20 hover:border-yellow-400/30 focus:border-yellow-400/50'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-400' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl shadow-yellow-400/20 z-50 max-h-64 overflow-y-auto">
          <div className="p-2" role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full px-4 py-3 text-left rounded-lg transition-all duration-300 text-sm ${
                  value === option.value
                    ? 'bg-yellow-400/20 text-yellow-400 font-medium border border-yellow-400/30'
                    : 'hover:bg-white/20 text-white hover:text-yellow-400'
                }`}
                role="option"
                aria-selected={value === option.value}
              >
                <div className="flex items-center justify-between">
                  <span className="tracking-wide">{option.label}</span>
                  {value === option.value && (
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

export default CustomSelect