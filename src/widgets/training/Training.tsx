import { memo } from 'react'
import { TRAINING } from './constants.ts'

function Training() {
  return (
    <section id="training" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {TRAINING.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Фото сверху, текст ниже */}
        <div className="max-w-7xl mx-auto">
          <figure className="relative rounded-3xl overflow-hidden border border-white/15 shadow-xl bg-black">
            <img
              src={TRAINING.imageSrc}
              alt={TRAINING.imageAlt}
              className="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </figure>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/15 p-6 md:p-8 mt-8">
            <div className="w-12 h-0.5 bg-yellow-400 mb-5 rounded-full"></div>
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
              {TRAINING.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Training)


