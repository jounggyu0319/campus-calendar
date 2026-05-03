# Campus Calendar — Project Brief

## 한 줄 요약
대학 캠퍼스 일정을 모아 보는 캘린더 앱(초기 단계: Next.js + Supabase Auth + Google/카카오 OAuth).

## 레포
- GitHub: https://github.com/jounggyu0319/campus-calendar
- Supabase 프로젝트 이름: campus-calendar

## studymap과 공통점
- Next.js 16 App Router, TypeScript, Tailwind CSS 4, `@supabase/ssr` 브라우저/서버 클라이언트
- 미들웨어에서 `/dashboard`·`/login` 세션 분기
- `/auth/callback`에서 `exchangeCodeForSession` 후 `/dashboard`로 리다이렉트
- 로그인 페이지: Google + 카카오 OAuth, 인앱 브라우저 배너, PWA 설치 안내
