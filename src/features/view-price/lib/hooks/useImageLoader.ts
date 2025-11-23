import { useState, useEffect, useMemo } from 'react'
import { GALLERY_BLOCKS } from '../constants'

export function useImageLoader(currentBlockId: string | null, currentIndex: number, isOpen: boolean) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const currentBlock = useMemo(() => 
    GALLERY_BLOCKS.find(b => b.id === currentBlockId) || null, 
    [currentBlockId]
  )

  const totalInBlock = currentBlock ? currentBlock.images.length : 0

  useEffect(() => {
    setImageLoaded(false)
  }, [currentIndex, currentBlockId])
  
  useEffect(() => {
    if (isOpen && currentBlock) {
      const preloadNext = () => {
        for (let i = 1; i <= 2; i++) {
          const nextIndex = (currentIndex + i) % currentBlock.images.length
          const img = new Image()
          img.src = currentBlock.images[nextIndex].src
        }
      }
      
      setTimeout(preloadNext, 100)
    }
  }, [isOpen, currentIndex, currentBlock])

  return {
    imageLoaded,
    setImageLoaded,
    currentBlock,
    totalInBlock
  }
}