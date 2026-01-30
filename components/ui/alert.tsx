import React from 'react'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

interface AlertProps {
  title?: string
  message: string
  variant?: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
  className?: string
}

const Alert: React.FC<AlertProps> = ({ 
  title, 
  message, 
  variant = 'info',
  onClose,
  className = '' 
}) => {
  
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-400" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-400" />
    }
  }
  
  const currentVariant = variants[variant]
  
  return (
    <div className={`rounded-lg border p-4 ${currentVariant.bg} ${currentVariant.border} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 ml-2">
          {currentVariant.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${currentVariant.text} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${currentVariant.text}`}>
            {message}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 mr-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">بستن</span>
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert