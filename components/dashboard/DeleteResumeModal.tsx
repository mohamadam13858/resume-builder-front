import Modal from '@/components/ui/modal'
import Button from '@/components/ui/button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteResumeModal({ isOpen, onClose, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="حذف رزومه" size="sm">
      <div className="py-5">
        <p className="text-gray-700  leading-relaxed">
          آیا از حذف این رزومه مطمئن هستید؟
          <span className="font-medium text-red-600  block mt-2">
            این عملیات قابل بازگشت نیست.
          </span>
        </p>
      </div>
      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onClose} className="flex-1">
          انصراف
        </Button>
        <Button variant="danger" onClick={onConfirm} className="flex-1">
          بله، حذف شود
        </Button>
      </div>
    </Modal>
  )
}