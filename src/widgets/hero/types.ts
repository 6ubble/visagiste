// Типы для компонента Hero

export interface HeroSlide {
  id: number
  image: string
}

export interface ButtonLabels {
  ORDER: string
  PRICES: string
}

export interface UseHeroSliderReturn {
  currentSlide: number
  slides: HeroSlide[]
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
}
