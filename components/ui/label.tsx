import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
  required?: boolean
  optional?: boolean
  className?: string
}

const Label: React.FC<LabelProps> = ({ 
  children, 
  htmlFor, 
  required = false,
  optional = false,
  className = '',
  ...props 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        block text-sm font-medium text-gray-700 mb-1
        ${className}
      `}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 mr-1">*</span>
      )}
      {optional && (
        <span className="text-gray-400 text-xs font-normal mr-2">
          (اختیاری)
        </span>
      )}
    </label>
  )
}


export function InlineLabel({ 
  children, 
  className = '',
  ...props 
}: Omit<LabelProps, 'required' | 'optional'>) {
  return (
    <label
      className={`
        inline-flex items-center text-sm font-medium text-gray-700
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  )
}


export function CheckboxLabel({ 
  children, 
  className = '',
  ...props 
}: Omit<LabelProps, 'required' | 'optional'>) {
  return (
    <label
      className={`
        flex items-center text-sm text-gray-700 cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label