import { useState, useEffect, memo, useCallback } from 'react'
import Navigation from './Navigation.tsx'
import MobileMenuButton from './MobileMenuButton.tsx'
import MobileMenu from './MobileMenu.tsx'
import type { ScrollToSectionFunction } from './types'

// Мемоизированный Header компонент
const Header = memo((): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Мемоизируем функцию скролла
  const scrollToSection: ScrollToSectionFunction = useCallback((sectionId: string): void => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64 // Высота header на разных экранах
      const elementPosition = element.offsetTop - headerHeight + 30
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }, [])

  // Мемоизируем функцию переключения меню
  const toggleMobileMenu = useCallback((): void => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  // Мемоизируем функцию закрытия меню
  const closeMobileMenu = useCallback((): void => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20 py-6">
            {/* Навигация - Скрыта на мобильных, видна на md+ */}
            <Navigation scrollToSection={scrollToSection} />
            
            {/* Кнопка мобильного меню - Видна только на мобильных */}
            <MobileMenuButton isOpen={isMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>
      </header>
      
      {/* Мобильное меню - вынесено за пределы Header для независимости от прозрачности */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={closeMobileMenu}
        scrollToSection={scrollToSection}
      />
    </>
  )
})

export default Header
