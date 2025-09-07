import { memo, useCallback, useMemo, useEffect, useState } from 'react'
import { PRICING_DATA } from './constants.ts'
import type { PricingItem } from './types'

// Мемоизированный компонент карточки прайсинга - максимально оптимизированная версия
const PricingCard = memo(({ item, cardProps, isLowEndDevice }: { item: PricingItem; cardProps: any; isLowEndDevice: boolean }) => (
  <div 
    className={`group pricing-card ${!isLowEndDevice ? 'pricing-card-transition' : ''} bg-white/10 ${!isLowEndDevice ? 'backdrop-blur-sm md:backdrop-blur-sm' : ''} rounded-2xl border border-white/20 p-6 hover:bg-white/15 hover:border-yellow-400/50 cursor-pointer`}
    {...cardProps}
  >
    {/* Заголовок карточки */}
    <div className="text-center mb-4">
      <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
        {item.title}
      </h3>
      <div className="w-8 h-0.5 bg-yellow-400 mx-auto rounded-full"></div>
    </div>

    {/* Цена */}
    <div className="text-center mb-4">
      <div className="text-3xl font-bold text-yellow-400 mb-1">
        {item.price}
      </div>
      <div className="text-xs text-gray-400 font-medium tracking-wide">
        ПРЕМИУМ КАЧЕСТВО
      </div>
    </div>

    {/* Описание */}
    <div className="text-center mb-6">
      <p className="text-gray-300 leading-relaxed text-sm">
        {item.description}
      </p>
    </div>

    {/* Кнопка действия */}
    <div className="text-center">
      <div className={`inline-flex items-center justify-center px-5 py-2 bg-yellow-400 text-black font-bold rounded-full ${!isLowEndDevice ? 'transition-transform duration-200 group-hover:scale-105' : ''}`}>
        <span className="text-sm tracking-wide">ЗАПИСАТЬСЯ</span>
        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
))

// МЕМОИЗИРУЕМ компонент
const GeneralPricing = memo((): React.JSX.Element => {
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

  // МЕМОИЗИРУЕМ обработчик клика для предотвращения пересоздания
  const handlePricingCardClick = useCallback(() => {
    const element = document.getElementById('order')
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64 // Высота header на разных экранах
      const elementPosition = element.offsetTop - headerHeight + 30
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  // МЕМОИЗИРУЕМ обработчик клавиш
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePricingCardClick()
    }
  }, [handlePricingCardClick])

  // МЕМОИЗИРУЕМ пропсы для карточек
  const cardProps = useMemo(() => ({
    onClick: handlePricingCardClick,
    onKeyDown: handleKeyDown,
    role: 'button' as const,
    tabIndex: 0
  }), [handlePricingCardClick, handleKeyDown])

  return (
    <section id="general-pricing" className="py-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Прайс-лист
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Эксклюзивные услуги для ресниц с использованием премиальных материалов
          </p>
        </div>

        {/* Карточки цен - максимально оптимизированная версия */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_DATA.map((item) => (
            <PricingCard key={item.id} item={item} cardProps={cardProps} isLowEndDevice={isLowEndDevice} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default GeneralPricing