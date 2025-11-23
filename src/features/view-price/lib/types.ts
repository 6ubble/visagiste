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

export interface PriceListModalProps {
  isOpen: boolean
  currentIndex: number
  currentBlockId: string | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}