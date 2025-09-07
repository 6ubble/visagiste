import { PRICING_DATA } from './constants.ts'

function GeneralPricing() {
  const scrollToOrder = () => {
    const element = document.getElementById('order')
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
    <section id="general-pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Прайс-лист
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Эксклюзивные услуги для ресниц с использованием премиальных материалов
          </p>
        </div>

        {/* Карточки цен */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_DATA.map((item) => (
            <div 
              key={item.id}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 hover:border-yellow-400/50 cursor-pointer transition-all duration-300"
              onClick={scrollToOrder}
            >
              {/* Заголовок карточки */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <div className="w-8 h-0.5 bg-yellow-400 mx-auto rounded-full"></div>
              </div>

              {/* Цена */}
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {item.price}
                </div>
                <div className="text-xs text-gray-400 font-medium">
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
                <div className="inline-flex items-center justify-center px-5 py-2 bg-yellow-400 text-black font-bold rounded-full transition-transform duration-200 group-hover:scale-105">
                  <span className="text-sm">ЗАПИСАТЬСЯ</span>
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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