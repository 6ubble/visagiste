import { PRICING_DATA } from './constants.ts'

function GeneralPricing(): React.JSX.Element {
  // Функция для скролла к форме заказа (такая же как в header и pricing)
  const handlePricingCardClick = () => {
    const element = document.getElementById('order')
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64 // Высота header на разных экранах
      const elementPosition = element.offsetTop - headerHeight + 30
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="general-pricing" className="py-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Наши цены
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Эксклюзивные услуги для ресниц с использованием премиальных материалов
          </p>
        </div>

        {/* Карточки цен */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_DATA.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 transition-all duration-500 hover:bg-white/15 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 cursor-pointer transform hover:-translate-y-2"
              onClick={handlePricingCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handlePricingCardClick()
                }
              }}
            >
              {/* Блестящий эффект */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Заголовок карточки */}
              <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                  {item.title}
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
              </div>

              {/* Цена */}
              <div className="text-center mb-6 relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                  {item.price}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wide">
                  ПРЕМИУМ КАЧЕСТВО
                </div>
              </div>

              {/* Описание */}
              <div className="text-center mb-6 relative z-10">
                <p className="text-gray-300 leading-relaxed text-base">
                  {item.description}
                </p>
              </div>

              {/* Кнопка действия */}
              <div className="text-center relative z-10">
                <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-400/30 group-hover:scale-105">
                  <span className="text-sm tracking-wide">ЗАПИСАТЬСЯ</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GeneralPricing
