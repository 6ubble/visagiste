// Простые типы для галереи-альбома
export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface GalleryProps {
  scrollToSection?: (sectionId: string) => void
}
