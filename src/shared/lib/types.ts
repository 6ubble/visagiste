import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'icon' | 'close'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

export interface IconProps {
  className?: string
}

export interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnBackdropClick?: boolean
  className?: string
}