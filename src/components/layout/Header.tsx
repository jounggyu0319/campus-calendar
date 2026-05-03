'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import ManualModal from './ManualModal'

const HAS_SEEN_MANUAL_KEY = 'hasSeenManual'

export default function Header({ user }: { user: User }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isManualOpen, setIsManualOpen] = useState(false)
  const menuWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(HAS_SEEN_MANUAL_KEY) != null) return
    } catch {
      return
    }
    queueMicrotask(() => setIsManualOpen(true))
  }, [])

  const handleManualClose = () => {
    try {
      localStorage.setItem(HAS_SEEN_MANUAL_KEY, 'true')
    } catch {
      /* ignore quota / private mode */
    }
    setIsManualOpen(false)
  }

  const handleLogout = async () => {
    setMenuOpen(false)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  useEffect(() => {
    if (!menuOpen) return
    const onMouseDown = (e: MouseEvent) => {
      const el = menuWrapRef.current
      if (el && !el.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [menuOpen])

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-[#e5e7eb] bg-white px-6">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-gray-900">캠퍼스 캘린더</span>
          <span className="text-xs text-gray-400 hidden sm:inline">캠퍼스 일정을 한곳에서</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 truncate max-w-[10rem] sm:max-w-none">
            {user.user_metadata?.full_name ?? user.email}
          </span>
          <div className="relative shrink-0" ref={menuWrapRef}>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((open) => !open)}
              className="text-xs text-gray-600 transition-colors hover:text-gray-900"
            >
              ⚙️ 설정
            </button>
            {menuOpen ? (
              <div
                className="absolute right-0 z-50 mt-1 min-w-[10.5rem] rounded-md border border-[#e5e7eb] bg-white py-1 shadow-lg"
                role="menu"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    setIsManualOpen(true)
                  }}
                  className="block w-full px-3 py-2 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  설명서
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => void handleLogout()}
                  className="block w-full px-3 py-2 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <ManualModal open={isManualOpen} onClose={handleManualClose} />
    </>
  )
}
