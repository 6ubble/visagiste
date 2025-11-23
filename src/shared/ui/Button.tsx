import type { ButtonProps } from '../lib/types'

function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center transition-all duration-300 font-medium'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black',
    secondary: 'bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white border border-white/30 hover:border-yellow-400/50',
    icon: 'bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/15 backdrop-blur-sm text-white border border-white/10 hover:scale-110',
    close: 'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm text-white border border-white/10 hover:scale-110'
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }
  
  const iconSizeStyles = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl'
  }

  const isIconVariant = variant === 'icon' || variant === 'close'
  const sizeClass = isIconVariant ? iconSizeStyles[size] : sizeStyles[size]
  const variantClass = variantStyles[variant]

  return (
    <button
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button