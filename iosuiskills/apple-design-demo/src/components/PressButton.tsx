import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './PressButton.css'

type PressButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

/** Instant press feedback on pointer-down (apple-design §1 Response). */
export function PressButton({ children, className = '', ...rest }: PressButtonProps) {
  return (
    <button type="button" className={`press-btn ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
