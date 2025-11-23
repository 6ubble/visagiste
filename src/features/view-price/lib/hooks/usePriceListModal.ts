import { useState } from 'react'
import { GALLERY_BLOCKS } from '../constants'

export function usePriceListModal() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)

  const openModal = (blockId: string, indexInBlock: number) => {
    setCurrentBlockId(blockId)
    setCurrentIndex(indexInBlock)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    const block = GALLERY_BLOCKS.find(b => b.id === currentBlockId)
    if (!block) return
    setCurrentIndex((prev) => (prev + 1) % block.images.length)
  }

  const prevImage = () => {
    const block = GALLERY_BLOCKS.find(b => b.id === currentBlockId)
    if (!block) return
    setCurrentIndex((prev) => (prev - 1 + block.images.length) % block.images.length)
  }

  return {
    currentIndex,
    isModalOpen,
    currentBlockId,
    openModal,
    closeModal,
    nextImage,
    prevImage
  }
}