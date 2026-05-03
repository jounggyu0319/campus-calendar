# Campus Calendar (캠퍼스 캘린더)

Next.js 16 + TypeScript + Tailwind CSS 4 + Supabase Auth(Google·카카오). 구조와 인증 패턴은 [studymap](https://github.com/jounggyu0319/studymap)과 동일합니다.

## 시작하기

1. `cp .env.local.example .env.local` 후 Supabase 프로젝트 URL·anon 키를 채웁니다.
2. Supabase Auth에서 Google·Kakao 프로바이더를 켜고, Redirect URL에 `https://<도메인>/auth/callback`과 로컬용 `http://localhost:3000/auth/callback`을 넣습니다.
3. 개발 서버: `npm run dev` → [http://localhost:3000](http://localhost:3000) (루트는 `/dashboard`로 리다이렉트)

## 폴더

- `src/app/` — App Router (`login`, `dashboard`, `auth/callback`)
- `src/components/` — 공용 UI
- `src/lib/supabase/` — 브라우저·서버 Supabase 클라이언트
- `supabase/migrations/` — SQL 마이그레이션
- `memory-bank/` — 진행 기록
