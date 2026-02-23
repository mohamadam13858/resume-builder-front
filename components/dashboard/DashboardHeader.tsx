import Button from '@/components/ui/button'
import { Plus } from 'lucide-react'

type Props = {
  userName: string
}

export default function DashboardHeader({ userName }: Props) {
  return (
    <header className="bg-white/80  backdrop-blur-md border-b border-gray-200/60  sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">
              داشبورد
            </h1>
            <p className="text-gray-600  mt-1.5">
              خوش آمدید، <span className="font-medium text-indigo-600 ">{userName}</span>
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={() => (window.location.href = '/builder')}
            className="shadow-lg shadow-indigo-200/50  hover:shadow-indigo-300/60 transition-shadow"
          >
            رزومه جدید بساز
          </Button>
        </div>
      </div>
    </header>
  )
}