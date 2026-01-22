# Project Structure

This is a Next.js App Router project. Core locations:
- `app/` for routes, layouts, and global styles (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`).
- `components/` for shared React components; `components/ui/` for UI primitives.
- `feature/` for feature-scoped modules; may include `components/`, `api/`, `hooks/`, `helpers/`.
- `lib/` for utilities or shared logic.
- `public/` for static assets served at the site root.
