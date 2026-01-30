import React from 'react'
import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  initials?: string
  className?: string
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar',
  size = 'md',
  initials,
  className = '',
  onClick
}) => {
  
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }
  
  const content = () => {
    if (src) {
      return (
        <img 
          src={src} 
          alt={alt}
          className="h-full w-full object-cover"
        />
      )
    } else if (initials) {
      return (
        <span className={`font-semibold ${textSizes[size]}`}>
          {initials}
        </span>
      )
    } else {
      return <User className="h-1/2 w-1/2 text-gray-400" />
    }
  }
  
  return (
    <div 
      className={`
        ${sizes[size]} 
        rounded-full bg-gray-200 flex items-center justify-center overflow-hidden
        ${onClick ? 'cursor-pointer hover:opacity-90' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {content()}
    </div>
  )
}

interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  className?: string
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  children, 
  max,
  className = '' 
}) => {
  const childrenArray = React.Children.toArray(children)
  const totalChildren = childrenArray.length
  
  if (max && totalChildren > max) {
    const visibleChildren = childrenArray.slice(0, max)
    const remaining = totalChildren - max
    
    return (
      <div className={`flex -space-x-2 ${className}`}>
        {visibleChildren}
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700">
            +{remaining}
          </span>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`flex -space-x-2 ${className}`}>
      {children}
    </div>
  )
}

export default Avatar