'use client'

import { useEffect, useState } from 'react'

type ManualModalProps = {
  open: boolean
  onClose: () => void
}

export default function ManualModal({ open, onClose }: ManualModalProps) {
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    queueMicrotask(() => setDetailOpen(false))
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="manual-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-lg bg-white px-6 py-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ colorScheme: 'light' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-xl leading-none text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="닫기"
        >
          ✕
        </button>

        <h1 id="manual-modal-title" className="pr-10 text-xl font-bold text-gray-900">
          캠퍼스 캘린더 사용 설명서
        </h1>

        <div className="mt-6 space-y-4 text-sm text-gray-600">
          <h2 className="text-sm font-semibold text-gray-900">[3줄 요약]</h2>
          <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
            <li>Google 또는 카카오로 로그인하면 대시보드에서 일정 기능을 이용할 수 있습니다.</li>
            <li>수업·과제·시험 등 캠퍼스 일정을 한곳에 모으는 앱으로 계속 확장될 예정입니다.</li>
            <li>설정(⚙️) 메뉴에서 이 설명서를 언제든 다시 볼 수 있습니다.</li>
          </ol>

          <div className="border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setDetailOpen((v) => !v)}
              aria-expanded={detailOpen}
              className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              <span>[자세한 안내 — 토글로 접기/펼치기]</span>
              <span className="shrink-0 text-xs font-normal text-gray-500" aria-hidden>
                {detailOpen ? '접기' : '펼치기'}
              </span>
            </button>

            {detailOpen ? (
              <div className="mt-3 space-y-5 pb-2 pl-0 text-sm leading-relaxed text-gray-600">
                <section>
                  <h3 className="font-semibold text-gray-900">1. 로그인</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>로그인 페이지에서 Google 또는 카카오를 선택하세요.</li>
                    <li>인앱 브라우저(카카오톡 등)에서는 안내에 따라 Safari/Chrome에서 여는 것이 좋습니다.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900">2. 대시보드</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>로그인 후 대시보드에서 앱 기능을 이용합니다.</li>
                    <li>우측 상단 설정에서 설명서를 다시 열거나 로그아웃할 수 있습니다.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900">3. 앱으로 설치하기</h3>
                  <p className="mt-2">
                    웹앱이지만 홈 화면이나 독에 추가해 앱처럼 사용할 수 있습니다.
                  </p>
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900">iPhone / iPad (iOS)</p>
                      <p className="mt-1">
                        Safari에서 열기 → 하단 공유 버튼(□↑) → &quot;홈 화면에 추가&quot;
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Android</p>
                      <p className="mt-1">
                        Chrome에서 열기 → 우측 상단 ⋮ → &quot;홈 화면에 추가&quot; 또는 &quot;앱 설치&quot;
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mac (macOS)</p>
                      <p className="mt-1">Safari → 파일 → &quot;독에 추가&quot;</p>
                      <p className="mt-1">또는 Chrome 주소창 우측 설치 아이콘(⊕)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Windows</p>
                      <p className="mt-1">
                        Chrome 또는 Edge → 주소창 우측 설치 아이콘(⊕) → &quot;설치&quot;
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
