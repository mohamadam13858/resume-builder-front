import Button from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

type Props = {
  onCreateNew: () => void
}

export default function ResumesEmptyState({ onCreateNew }: Props) {
  return (
    <div className="bg-white/70 border-2 border-dashed border-gray-300  rounded-2xl p-16 text-center backdrop-blur-sm">
      <div className="mx-auto w-20 h-20 bg-indigo-100  rounded-full flex items-center justify-center mb-6">
        <FileText className="h-10 w-10 text-indigo-500 " />
      </div>
      <h3 className="text-2xl font-bold text-gray-800  mb-3">
        هنوز رزومه‌ای ساخته نشده!
      </h3>
      <p className="text-gray-600  mb-8 max-w-md mx-auto">
        بیایید همین حالا اولین رزومه حرفه‌ای خود را بسازیم
      </p>
      <Button
        variant="primary"
        size="lg"
        leftIcon={<Plus className="h-5 w-5" />}
        onClick={onCreateNew}
        className="shadow-lg shadow-indigo-200/50 "
      >
        ساخت رزومه جدید
      </Button>
    </div>
  )
}