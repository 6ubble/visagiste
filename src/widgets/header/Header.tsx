import Navigation from './Navigation'
import MobileMenuButton from '../../shared/ui/MobileMenuButton'
import MobileMenu from './MobileMenu'
import { useHeader } from '../../shared/lib/hooks/useHeader'

function Header() {
  const { isScrolled, isMenuOpen, toggleMobileMenu, closeMobileMenu, scrollToSection } = useHeader()

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