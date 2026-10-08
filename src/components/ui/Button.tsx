import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost'
export type ButtonSize = 'sm' | 'md'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary: 'border-ink bg-ink text-surface hover:bg-ink-2 hover:border-ink-2',
  secondary: 'border-line bg-surface text-ink hover:bg-sand hover:border-taupe',
  accent: 'border-accent bg-accent text-surface hover:bg-accent-hover hover:border-accent-hover',
  ghost: 'border-transparent bg-transparent text-ink hover:bg-sand',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-caption',
  md: 'min-h-12 px-6 py-3 text-body-sm',
}

export default function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-pill border font-semibold transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
