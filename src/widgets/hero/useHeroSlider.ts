import { useState, useEffect } from 'react'
import { HERO_SLIDES, SLIDE_INTERVAL } from './constants.ts'
import type { UseHeroSliderReturn } from './types'

export function useHeroSlider(): UseHeroSliderReturn {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const goToSlide = (index: number): void => {
    setCurrentSlide(index)
  }

  return {
    currentSlide,
    slides: HERO_SLIDES,
    nextSlide,
    prevSlide,
    goToSlide
  }
}
