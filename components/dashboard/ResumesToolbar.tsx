import { Search, LayoutGrid, List } from 'lucide-react'
import Button from '@/components/ui/button'

type Props = {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewChange: (mode: 'grid' | 'list') => void
}

export default function ResumesToolbar({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewChange,
}: Props) {
  return (
    <div className="bg-white  border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        <div className="flex-1 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="جستجو در عنوان رزومه‌ها..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pr-12 pl-5 py-3.5 bg-transparent border border-gray-300  rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/40 outline-none transition-all text-base text-gray-900  placeholder-gray-500 "
          />
        </div>

        <div className="flex gap-2.5 shrink-0">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="md"
            onClick={() => onViewChange('grid')}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="md"
            onClick={() => onViewChange('list')}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}