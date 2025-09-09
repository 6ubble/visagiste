import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 30
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20 py-6">
            <Navigation scrollToSection={scrollToSection} />
            <MobileMenuButton isOpen={isMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>
      </header>
      
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={closeMobileMenu}
        scrollToSection={scrollToSection}
      />
    </>
  )
}

export default Header