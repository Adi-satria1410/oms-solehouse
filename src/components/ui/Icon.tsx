import type { CSSProperties } from 'react'

type IconProps = {
  name: string
  filled?: boolean
  size?: number
  label?: string
  className?: string
}

export default function Icon({ name, filled = false, size = 24, label, className = '' }: IconProps) {
  const style: CSSProperties = {
    fontSize: size,
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
  }

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {name}
    </span>
  )
}
