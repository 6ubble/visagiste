import { useState, useEffect } from 'react'
import { useBodyScrollLock } from '../lib/hooks/useBodyScrollLock'
import type { ModalProps } from '../lib/types'

function Modal({ isOpen, onClose, children, closeOnBackdropClick = true, className = '' }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`relative max-w-6xl max-h-[95vh] w-full transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal