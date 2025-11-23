import { useScroll } from './useScroll'
import { useMobileMenu } from './useMobileMenu'
import { useScrollToSection } from './useScrollToSection'

export function useHeader() {
  const { isScrolled } = useScroll(20)
  const { isMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const { scrollToSection: baseScrollToSection } = useScrollToSection()

  const scrollToSection = (sectionId: string) => {
    baseScrollToSection(sectionId)
    closeMobileMenu()
  }

  return {
    isScrolled,
    isMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    scrollToSection
  }
}