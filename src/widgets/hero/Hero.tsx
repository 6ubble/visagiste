import { HERO_IMAGE, HERO_TEXT, BUTTON_LABELS } from './constants'

function Hero() {
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
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden py-20 w-full min-h-screen">
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
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Контент */}
      <div className="relative flex items-center justify-center z-20 min-h-screen">
        <div className="text-center text-white px-6 md:px-12 max-w-5xl">
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8 rounded-full"></div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              {HERO_TEXT.title}
            </span>
          </h1>
          
          <h2 className="text-xl md:text-4xl text-yellow-400 font-medium mb-6 md:mb-8">
            {HERO_TEXT.subtitle}
          </h2>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            {HERO_TEXT.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-8">
            <button 
              onClick={() => scrollToSection('order')}
              className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:-translate-y-1 text-lg md:text-xl min-w-[200px] md:min-w-[220px]"
            >
              <span className="relative z-10">{BUTTON_LABELS.ORDER}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('general-pricing')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1 text-lg md:text-xl border border-white/30 hover:border-yellow-400/50 min-w-[200px] md:min-w-[220px]"
            >
              {BUTTON_LABELS.PRICES}
            </button>
            
            <button 
              onClick={() => scrollToSection('gallery')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1 text-lg md:text-xl border border-white/30 hover:border-yellow-400/50 min-w-[200px] md:min-w-[220px]"
            >
              {BUTTON_LABELS.GALLERY}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero