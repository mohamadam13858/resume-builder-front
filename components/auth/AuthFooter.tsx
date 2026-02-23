import Link from 'next/link'

export default function AuthFooter() {
  return (
    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
      با ورود یا ثبت‌نام، شما با{' '}
      <Link href="/terms" className="text-primary hover:underline">
        شرایط استفاده
      </Link>{' '}
      و{' '}
      <Link href="/privacy" className="text-primary hover:underline">
        حریم خصوصی
      </Link>{' '}
      موافقت می‌کنید.
    </p>
  )
}