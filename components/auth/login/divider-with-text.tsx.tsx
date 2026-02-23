type DividerWithTextProps = {
  text: string
  className?: string
}

export default function DividerWithText({ text, className = '' }: DividerWithTextProps) {
  return (
    <div className={`relative my-7 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400">
          {text}
        </span>
      </div>
    </div>
  )
}