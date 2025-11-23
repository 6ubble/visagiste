import { memo } from 'react'
import { TRAINING } from './constants.ts'

function Training() {
  return (
    <section id="training" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {TRAINING.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 h-full">
              <figure className="relative rounded-3xl overflow-hidden border border-white/15 shadow-xl bg-black h-full">
                <img
                  src={TRAINING.imageSrc}
                  alt={TRAINING.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </figure>
            </div>

            <div className="order-1 lg:order-2 h-full">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/15 p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6 rounded-full mx-auto"></div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
                  Профессиональное обучение
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                  {TRAINING.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      Почему стоит выбрать именно это обучение:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-3 mt-1">✓</span>
                        <div>
                          <div className="text-white font-medium">Опыт более 5 лет</div>
                          <div className="text-sm text-gray-400">Проверенные техники и методики</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-3 mt-1">✓</span>
                        <div>
                          <div className="text-white font-medium">100% практика</div>
                          <div className="text-sm text-gray-400">Работа с реальными моделями</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-3 mt-1">✓</span>
                        <div>
                          <div className="text-white font-medium">Поддержка после курса</div>
                          <div className="text-sm text-gray-400">Консультации и помощь в работе</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-3 mt-1">✓</span>
                        <div>
                          <div className="text-white font-medium">Современные материалы</div>
                          <div className="text-sm text-gray-400">Работа с лучшими брендами</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Training)