import Card from '@/components/ui/card'

type Props = {
  resumes: any[] // بعداً نوع دقیق‌تر بگذارید
}

export default function StatsCards({ resumes }: Props) {
  const stats = {
    total: resumes.length,
    public: resumes.filter(r => r.isPublic).length,
    views: resumes.reduce((sum, r) => sum + (r.viewCount || 0), 0),
    lastUpdate: resumes.length
      ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime())))
      : null,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
      <Card className="p-6 bg-white border">
        <p className="text-sm text-gray-600 dark:text-gray-400">تعداد رزومه‌ها</p>
        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
      </Card>

      <Card className="p-6 bg-white border">
        <p className="text-sm text-gray-600 dark:text-gray-400">رزومه‌های عمومی</p>
        <p className="text-3xl font-bold text-gray-900">{stats.public}</p>
      </Card>

      <Card className="p-6 bg-white border">
        <p className="text-sm text-gray-600 dark:text-gray-400">کل بازدیدها</p>
        <p className="text-3xl font-bold text-gray-900">
          {stats.views.toLocaleString('fa-IR')}
        </p>
      </Card>

      <Card className="p-6 bg-white border">
        <p className="text-sm text-gray-600 dark:text-gray-400">آخرین بروزرسانی</p>
        <p className="text-2xl font-bold text-gray-900">
          {stats.lastUpdate
            ? stats.lastUpdate.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '—'}
        </p>
      </Card>
    </div>
  )
}