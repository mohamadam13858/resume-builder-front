
export default function AuthHeader({ title = '' }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 bg-primary rounded-2xl mb-5 shadow-md">
        <svg
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        خوش آمدید! لطفا اطلاعات خود را وارد کنید
      </p>
    </div>
  )
}