import { useState } from 'react'

export function useMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }

  return {
    isMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  }
}