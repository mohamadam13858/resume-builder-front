import React from 'react'
import { 
  FormProvider, 
  useFormContext, 
  UseFormReturn,
  FieldValues 
} from 'react-hook-form'

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  children: React.ReactNode
  className?: string
}

export function Form<T extends FieldValues>({ 
  form, 
  onSubmit, 
  children, 
  className = '' 
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={`space-y-6 ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  )
}

interface FormFieldProps {
  name: string
  label: string
  required?: boolean
  children: React.ReactNode
  error?: string
  className?: string
}

export function FormField({ 
  name, 
  label, 
  required = false, 
  children, 
  error,
  className = '' 
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}


export function FormMessage({ message }: { message?: string }) {
  if (!message) return null
  
  return (
    <p className="text-sm text-red-600 mt-1">
      {message}
    </p>
  )
}