// src/components/Hero/constants.ts
import photo1 from '../../shared/assets/Hero/photo1.webp'
import photo2 from '../../shared/assets/Hero/photo2.webp'
import photo3 from '../../shared/assets/Hero/photo3.webp'
import type { HeroSlide, ButtonLabels } from './types'

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: photo1
  },
  {
    id: 2,
    image: photo2
  },
  {
    id: 3,
    image: photo3
  }
]

// Статичный текст для hero секции
export const HERO_TEXT = {
  title: "Профессиональные услуги для ресниц",
  subtitle: "Студия красоты Visagiste",
  description: "Наращивание, ламинирование и уход за ресницами с использованием качественных материалов"
}

export const SLIDE_INTERVAL: number = 5000 // 5 секунд

export const BUTTON_LABELS: ButtonLabels = {
  ORDER: "Записаться",
  PRICES: "Узнать цены"
}