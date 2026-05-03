# Tech Context

## 스택
- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS 4)
- **Backend/DB**: Supabase (PostgreSQL, Auth)
- **인증**: Supabase Auth — Google OAuth, Kakao OAuth (`signInWithOAuth`, PKCE 콜백)

## 환경 변수
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 참고 레포
studymap (`jounggyu0319/studymap`)과 동일한 Supabase 클라이언트·미들웨어·콜백·로그인 페이지 패턴.
