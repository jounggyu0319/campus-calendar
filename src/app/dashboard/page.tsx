import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/Header'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div
      className="flex h-dvh max-h-dvh min-h-0 flex-col overflow-x-hidden bg-[#f3f4f6]"
      style={{ backgroundColor: '#f3f4f6' }}
    >
      <Header user={user} />
      <main className="flex-1 min-h-0 overflow-auto p-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-600">
            로그인되었습니다. Supabase 프로젝트 <strong className="text-gray-900">campus-calendar</strong>에 맞춘
            앱 뼈대입니다. 일정·캘린더 기능은 이후 마이그레이션과 화면을 추가하면 됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
