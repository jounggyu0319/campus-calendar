'use client'

import { createClient } from '@/lib/supabase/client'
import { useSyncExternalStore } from 'react'

const IN_APP_UA_SNIPPETS = [
  'KAKAOTALK',
  'Instagram',
  'NAVER',
  'FB_IAB',
  'FB4A',
  'Line',
] as const

type ClientOs = 'android' | 'ios' | 'other'

function detectInApp(userAgent: string): boolean {
  return IN_APP_UA_SNIPPETS.some((s) => userAgent.includes(s))
}

function detectOs(userAgent: string): ClientOs {
  if (userAgent.includes('Android')) return 'android'
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'ios'
  return 'other'
}

function subscribeUserAgent() {
  return () => {}
}

function getUserAgentSnapshot(): string {
  if (typeof window === 'undefined') return ''
  return navigator.userAgent
}

function getServerUserAgentSnapshot(): string {
  return ''
}

export default function LoginPage() {
  const ua = useSyncExternalStore(
    subscribeUserAgent,
    getUserAgentSnapshot,
    getServerUserAgentSnapshot
  )
  const mounted = ua !== ''
  const isInApp = mounted ? detectInApp(ua) : false
  const clientOs: ClientOs = mounted ? detectOs(ua) : 'other'

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleKakaoLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const openChromeIntent = () => {
    const url = `intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;end`
    location.href = url
  }

  const pwaSteps: Record<ClientOs, string[]> = {
    android: [
      'Chrome 브라우저에서 이 페이지를 열어주세요',
      '우상단 ⋮ 메뉴 → 홈 화면에 추가',
      '설치 후 홈 화면에서 앱처럼 실행',
    ],
    ios: [
      'Safari에서 이 페이지를 열어주세요',
      '하단 공유 버튼(□↑) → 홈 화면에 추가',
      '설치 후 홈 화면에서 앱처럼 실행',
    ],
    other: [
      'Chrome 주소창 우측 설치 아이콘(⊕)을 클릭하세요',
      '또는 메뉴 → 앱 설치',
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {mounted && isInApp && clientOs === 'android' && (
        <div
          className="w-full shrink-0 px-4 py-3 text-center"
          style={{ backgroundColor: '#0f172a' }}
        >
          <p className="text-sm font-medium text-white">앱으로 설치하려면 Chrome에서 여세요</p>
          <p className="mt-1 text-xs text-gray-400">인앱 브라우저에서는 설치가 안 돼요</p>
          <button
            type="button"
            onClick={openChromeIntent}
            className="mt-3 w-full max-w-xs rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
          >
            Chrome으로 열기
          </button>
        </div>
      )}
      {mounted && isInApp && clientOs === 'ios' && (
        <div className="w-full shrink-0 border-b border-gray-200 bg-white px-4 py-3 text-center">
          <p className="text-sm font-medium text-gray-900">Safari에서 열어야 앱 설치가 가능해요</p>
          <p className="mt-1 text-xs text-blue-600">우상단 ··· → Safari로 열기</p>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">캠퍼스 캘린더</h1>
          <p className="text-sm text-gray-500 mb-8">캠퍼스 일정을 한곳에서</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Google로 계속하기
          </button>
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="mt-3 w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#FEE500', color: '#000000' }}
          >
            카카오로 시작하기
          </button>
          {mounted && (
            <>
              <div className="my-8 border-t border-gray-100" aria-hidden />
              <section className="text-left">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                  앱처럼 설치하기
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-xs text-gray-600 leading-relaxed">
                  {pwaSteps[clientOs].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
