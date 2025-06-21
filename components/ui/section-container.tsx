import React from "react"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  background?: 'white' | 'gray' | 'navy' | 'orange' | 'transparent'
}

export const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(({ 
  children, 
  className = '', 
  fullWidth = false,
  background = 'white' 
}, ref) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    navy: 'bg-[#004672]',
    orange: 'bg-orange-500',
    transparent: ''
  }

  return (
    <section ref={ref} className={`w-full ${backgroundClasses[background]} ${className}`}>
      <div className={`${fullWidth ? 'w-full' : 'w-full max-w-7xl mx-auto px-4'}`}>
        {children}
      </div>
    </section>
  )
})

SectionContainer.displayName = "SectionContainer"