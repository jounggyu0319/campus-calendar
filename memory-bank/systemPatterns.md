# System Patterns

- **세션**: `@supabase/ssr` — `middleware`에서 `getUser()`, Route Handler/Server Component에서 `createClient()` (cookies 연동).
- **OAuth**: 클라이언트 `signInWithOAuth` → 프로바이더 → `/auth/callback?code=` → `exchangeCodeForSession` → `/dashboard`.
