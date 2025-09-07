import { useHeroSlider } from './useHeroSlider.ts'
import { BUTTON_LABELS, HERO_TEXT } from './constants.ts'

function Hero(): React.JSX.Element {
  const { currentSlide, slides, goToSlide } = useHeroSlider()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 30
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden h-screen w-full min-h-screen">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.08),transparent_60%)]"></div>
      
      {/* Фоновые изображения всех слайдов */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img 
            src={slide.image} 
            alt={HERO_TEXT.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        </div>
      ))}

      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6 md:px-12 max-w-5xl hero-content">
          {/* Контейнер с фиксированной высотой для текста */}
          <div className="min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            <div className="animate-fade-in-up">
              {/* Декоративная линия */}
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
          
          {/* Кнопки в отдельном контейнере с фиксированным позиционированием */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center animate-fade-in-up mt-8">
            <button 
              onClick={() => scrollToSection('order')}
              className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 md:py-5 px-8 md:px-10 rounded-full transition-all duration-300 text-lg md:text-xl focus:outline-none min-w-[240px] md:min-w-[280px] shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:-translate-y-1"
            >
              <span className="relative z-10 tracking-wide">{BUTTON_LABELS.ORDER}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('general-pricing')}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-full transition-all duration-300 text-lg md:text-xl focus:outline-none border border-white/30 hover:border-yellow-400/50 min-w-[240px] md:min-w-[280px] shadow-lg hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1"
            >
              <span className="tracking-wide">{BUTTON_LABELS.PRICES}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 md:space-x-5 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 ease-in-out transform ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 scale-125 shadow-lg shadow-yellow-400/50' 
                : 'bg-white/30 hover:bg-white/50 hover:scale-110 backdrop-blur-sm'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
