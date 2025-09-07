import { memo, useCallback, useEffect, useState } from 'react'
import { HERO_IMAGE, HERO_TEXT, BUTTON_LABELS } from './constants'

// Мемоизированный Hero компонент
const Hero = memo((): React.JSX.Element => {
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

  // Мемоизируем обработчик скролла
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 30
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden h-screen w-full min-h-screen">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.08),transparent_60%)]"></div>
      
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img 
          src={HERO_IMAGE}
          alt={`${HERO_TEXT.title} - ${HERO_TEXT.subtitle}`}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Контент */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6 md:px-12 max-w-5xl hero-content">
          <div className="min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            <div className="animate-fade-in-up">
              <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8 rounded-full"></div>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight animate-fade-in-up text-white min-h-[1.2em] flex items-center justify-center">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                  {HERO_TEXT.title}
                </span>
              </h1>
              
              <h2 className="text-xl md:text-4xl text-yellow-400 font-medium mb-6 md:mb-8 opacity-95 animate-fade-in-up min-h-[1.2em] flex items-center justify-center tracking-wide">
                {HERO_TEXT.subtitle}
              </h2>
              
              <p className="text-lg md:text-2xl text-gray-200 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto opacity-90 animate-fade-in-up min-h-[3em] flex items-center justify-center font-light">
                {HERO_TEXT.description}
              </p>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center ${!isLowEndDevice ? 'animate-fade-in-up' : ''} mt-8`}>
            <button 
              onClick={() => scrollToSection('order')}
              className={`group relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-full ${!isLowEndDevice ? 'transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:-translate-y-1' : ''} text-lg md:text-xl focus:outline-none min-w-[200px] md:min-w-[220px]`}
            >
              <span className="relative z-10 tracking-wide">{BUTTON_LABELS.ORDER}</span>
              {!isLowEndDevice && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('general-pricing')}
              className={`group bg-white/10 hover:bg-white/20 ${!isLowEndDevice ? 'backdrop-blur-lg' : ''} text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-full ${!isLowEndDevice ? 'transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1' : ''} text-lg md:text-xl focus:outline-none border border-white/30 hover:border-yellow-400/50 min-w-[200px] md:min-w-[220px]`}
            >
              <span className="tracking-wide">{BUTTON_LABELS.PRICES}</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('gallery')}
              className={`group bg-white/10 hover:bg-white/20 ${!isLowEndDevice ? 'backdrop-blur-lg' : ''} text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-full ${!isLowEndDevice ? 'transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1' : ''} text-lg md:text-xl focus:outline-none border border-white/30 hover:border-yellow-400/50 min-w-[200px] md:min-w-[220px]`}
            >
              <span className="tracking-wide">{BUTTON_LABELS.GALLERY}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero