import React from 'react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'text-primary',
  className = '' 
}) => {
  
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        className={`animate-spin ${sizes[size]} ${color}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}


export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <Loader size="lg" />
    </div>
  )
}


export function ButtonLoader() {
  return (
    <div className="inline-flex items-center">
      <Loader size="sm" color="text-current" />
      <span className="mr-2">در حال پردازش...</span>
    </div>
  )
}

export default Loader