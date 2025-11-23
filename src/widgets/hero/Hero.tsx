import { HERO_IMAGE, HERO_TEXT, BUTTON_LABELS, CONTACT_INFO } from './constants'
import { useScrollToSection } from '../../shared/lib/hooks/useScrollToSection'
import { VkIcon, InstagramIcon, LocationIcon } from '../../shared/ui/Icons'
import Button from '../../shared/ui/Button'

function Hero() {
  const { scrollToSection } = useScrollToSection()

  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden py-20 w-full min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.08),transparent_60%)]"></div>
      
      <div className="absolute inset-0">
        <img 
          src={HERO_IMAGE}
          alt={`${HERO_TEXT.title} - ${HERO_TEXT.subtitle}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative flex items-center justify-center z-20 min-h-screen">
        <div className="text-center text-white px-6 md:px-12 max-w-5xl">
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8 rounded-full"></div>
          
          <h1 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              {HERO_TEXT.title}
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl text-yellow-400 font-medium mb-6 md:mb-8">
            {HERO_TEXT.subtitle}
          </h2>
          
          <div className="flex items-center justify-center gap-6 mb-6 md:mb-8">
            <a
              href="https://vk.com/annagoncharovapm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="text-white/90 hover:text-yellow-400 transition-colors duration-300"
            >
              <VkIcon />
            </a>
            <a
              href="https://www.instagram.com/annagoncharova.pm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/90 hover:text-yellow-400 transition-colors duration-300"
            >
              <InstagramIcon />
            </a>
          </div>
          
          <div className="hidden md:flex items-center justify-center gap-3 mb-6 md:mb-8">
            <LocationIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-lg md:text-xl text-gray-200 font-medium">
              {CONTACT_INFO.address}
            </span>
          </div>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            {HERO_TEXT.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('order')}
              className="group relative rounded-full shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 text-lg md:text-xl min-w-[200px] md:min-w-[220px] font-bold"
            >
              <span className="relative z-10">{BUTTON_LABELS.ORDER}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('prices')}
              className="rounded-full shadow-lg hover:shadow-2xl hover:shadow-white/10 text-lg md:text-xl min-w-[200px] md:min-w-[220px] font-bold"
            >
              {BUTTON_LABELS.PRICES}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero