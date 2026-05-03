# Progress

## 2026-05-03 — 프로젝트 스캐폴드
- `create-next-app` (Next 16.2.4, App Router, src/, Tailwind 4)
- `src/lib/supabase/client.ts`, `server.ts` — studymap과 동일 패턴
- `src/middleware.ts` — `/dashboard` 미인증 → `/login`, `/login` 인증 → `/dashboard`
- `src/app/auth/callback/route.ts` — OAuth 코드 교환
- `src/app/login/page.tsx` — Google + 카카오, 인앱/PWA 안내 (studymap과 동일 UX)
- `src/components/layout/Header.tsx` — 로그아웃
- `src/app/dashboard/page.tsx` — 인증 확인 후 플레이스홀더 본문
- `public/manifest.json`, 아이콘(임시: studymap 에셋 복사)
- `supabase/migrations/` — 자리 표시 마이그레이션
- `.env.local.example` — `NEXT_PUBLIC_SUPABASE_*`

## 다음 할 일 (예시)
- Supabase에 Google·Kakao 프로바이더 및 Redirect URL 설정
- 배포 URL 반영 후 OAuth 콜백 화이트리스트 업데이트
- 캘린더 도메인 스키마·RLS·UI 구현
