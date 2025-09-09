// Типы для галереи с блоками
export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface GalleryBlock {
  id: string
  title: string
  description?: string
  images: GalleryImage[]
  priceFrom?: number
}

export interface GalleryProps {
  scrollToSection?: (sectionId: string) => void
}
