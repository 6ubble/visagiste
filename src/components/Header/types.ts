// Типы для компонентов Header

export type ScrollToSectionFunction = (sectionId: string) => void

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  scrollToSection: ScrollToSectionFunction
}

export interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export interface NavigationProps {
  scrollToSection: ScrollToSectionFunction
}
