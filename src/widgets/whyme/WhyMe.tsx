import { REASONS, WHY_ME_MEDIA, type Reason } from './constants.ts'

function WhyMe() {
  return (
    <section id="why-me" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Почему выбрать меня?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Макет: слева фото, справа причины */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-xl aspect-[4/5]">
              <img
                src={WHY_ME_MEDIA.photoSrc}
                alt={WHY_ME_MEDIA.photoAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr items-stretch">
              {REASONS.map((reason: Reason) => (
                <div
                  key={reason.id}
                  className="relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 md:p-6 h-full flex flex-col"
                >
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-white text-sm md:text-lg font-semibold tracking-tight">{reason.title}</h3>
                    <div className="w-10 h-0.5 bg-yellow-400 my-3 rounded-full mx-auto"></div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mt-1">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyMe

 