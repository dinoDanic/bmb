# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 App Router project with TypeScript, React 19, Tailwind CSS v4, and shadcn/ui components. The project uses pnpm for package management and follows a feature-based architecture.

## Development Commands

```bash
# Development server (http://localhost:3670)
pnpm dev

# Production build
pnpm build

# Run production server (requires build first)
pnpm start

# Linting
pnpm lint

# Database commands (Drizzle ORM)
pnpm db:generate    # Generate migrations from schema
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema changes directly (dev only)
pnpm db:studio      # Open Drizzle Studio GUI
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages, layouts, and global styles
  - `app/page.tsx` - Root page
  - `app/layout.tsx` - Root layout with font configuration
  - `app/globals.css` - Global styles and Tailwind theme variables
  - `app/(landing)/` - Landing page route group
  - `app/admin/` - Admin panel routes
    - `app/admin/auth/login/` - Login page (public)
    - `app/admin/auth/core/` - Protected admin routes with auth layout

- `features/` - Feature-based modules organized by domain
  - Each feature may contain: `components/`, `sections/`, `data/`, `api/`, `hooks/`, `helpers/`
  - `features/admin/` - Admin panel features (auth, categories, products, product-details, seed)
  - `features/auth/` - Authentication (login, logout)
  - `features/categories/` - Category management (CRUD operations, data table)
  - Features are composable; landing page composes categories and products features

- `components/` - Shared React components
  - `components/ui/` - shadcn/ui primitives (button, card, input, etc.)
  - `components/form/` - Form components with react-hook-form integration
  - `components/primitives/` - Layout primitives (grid, stack, cluster, etc.)
  - Shared components used across multiple features

- `lib/` - Utilities and shared logic
  - `lib/utils.ts` - Utility functions (includes `cn()` for className merging)
  - `lib/types.ts` - Shared TypeScript types
  - `lib/auth.ts` - JWT-based authentication (session creation, verification)
  - `lib/tanstack/` - TanStack Query configuration

- `db/` - Database layer (Drizzle ORM with PostgreSQL)
  - `db/schema/` - Database table definitions (categories, products, product-details, users)
  - `db/schema/index.ts` - Exports all schemas
  - `db/types.ts` - Type inference from schemas using `InferSelectModel` and `InferInsertModel`
  - `db/migrations/` - Generated migration files
  - `db/data/` - Seed data
  - `db/index.ts` - Database connection instance

- `public/` - Static assets served at site root

### Path Aliases

The project uses `@/*` path aliases (configured in `tsconfig.json`):
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Database Architecture (Drizzle ORM)

- Uses PostgreSQL with Drizzle ORM
- Connection via `pg` driver with connection pooling
- Schema-first approach: define tables in `db/schema/`, generate migrations
- Type-safe queries with full TypeScript inference
- Types are exported from `db/types.ts` using Drizzle's `InferSelectModel` and `InferInsertModel`
- Relations defined inline with schemas (e.g., self-referencing parent-child for categories)

### Authentication Flow

- JWT-based sessions stored in HTTP-only cookies (`admin_session`)
- Session creation: `createSession(userId, email)` in `lib/auth.ts`
- Session verification: `verifySession()` returns `SessionPayload | null`
- Protected routes use layout-based auth: `app/admin/auth/core/layout.tsx` verifies session and redirects if invalid
- Login handled by server action: `features/auth/api/login.ts`

### Server Actions Pattern

Server actions (marked `"use server"`) are placed in `features/<domain>/api/actions.ts`:
- Category CRUD: `features/categories/api/actions.ts`
- Uses `revalidatePath()` to invalidate Next.js cache after mutations
- Returns typed results using types from `db/types.ts`

### UI Component System

- Uses shadcn/ui with "base-maia" style variant
- All UI components are built on Base UI React (`@base-ui/react`)
- Icon library: Hugeicons (`@hugeicons/react`)
- Component configuration in `components.json`
- Styling with Tailwind CSS v4 configured via `postcss.config.mjs`

## Critical Rules

**ALWAYS ASK BEFORE:**
- Making architectural decisions
- Creating or modifying database migrations
- Changing project structure or build configuration
- Adding new dependencies or tools

This is a dev environment - we can dump data. Don't overthink or create migration scripts unless explicitly requested.

## Code Conventions

### TypeScript

- Strict mode enabled (`tsconfig.json`)
- Prefer type inference over redundant annotations
- Use `unknown` for untrusted data, narrow before use
- Avoid `any`; use only when unavoidable and explain why
- Use `@ts-expect-error` (not `@ts-ignore`) with brief reason when necessary
- **CRITICAL: Always explicitly type arrays and objects**
  - ALWAYS annotate arrays with explicit types: `const items: Item[] = []`
  - ALWAYS annotate objects with explicit types: `const config: Config = {}`
  - When mapping arrays, ALWAYS type the arrow function return (not the array variable): `const options = items.map((item): FormOption => ({ ... }))`
    - This catches type errors immediately in the mapping function
    - NEVER do: `const options: FormOption[] = items.map((item) => ({ ... }))`
    - ALWAYS do: `const options = items.map((item): FormOption => ({ ... }))`
  - Never rely on implicit type inference for arrays or objects
- **CRITICAL: Never duplicate types - always reuse existing types from their source**
  - For database data: Use Drizzle's `InferSelectModel` or `InferInsertModel` from `db/types.ts`
  - For API responses: Import and reuse types from the API route or shared types
  - For components: Import prop types from the component definition
  - For form options: Use `FormOption` from `@/components/form/types`
  - Example: `import type { Category, NewCategory } from "@/db/types"`
  - **NEVER generate new types when existing types can be reused**

### React

- Functional components only
- React 19 with RSC (React Server Components) enabled
- File naming: kebab-case for components (e.g., `component-example.tsx`)
- Server Components by default (no `"use client"` unless needed)
- Use `"use client"` only for: interactive state, event handlers, browser APIs, Context providers
- Use `"use server"` for Server Actions (data mutations)
- **CRITICAL: Never destructure props or hook returns**
  - Component props: Use `props.product`, `props.trigger` (NEVER `{ product, trigger }`)
  - Hook returns: Use `const mutation = useMutation()` then `mutation.mutate`, `mutation.isPending` (NEVER `const { mutate, isPending } = useMutation()`)
  - This keeps code clear and traceable

### Styling

- Tailwind CSS v4 with CSS variables for theming (`app/globals.css`)
- Never use hardcoded colors; use theme colors from `app/globals.css` only
- Theme supports light/dark modes via `next-themes` (configured in root layout)
- Keep utility classes readable and grouped
- Card styling centralized in `Card` component; only allow local overrides like `pt-0` for edge cases
- Use `cn()` helper from `lib/utils.ts` for conditional/merged classNames

### Code Organization

- Keep changes minimal and consistent with existing patterns
- Extract components used more than 2 times or likely to be reused
- Apply reusability to repeated code patterns (use arrays + map instead of repeated markup)
- Organize by feature: `features/<name>/components`, `features/<name>/api`, `features/<name>/data`
- Categories and products are separate features; landing only composes them

### Formatting

- Indentation: 2 spaces (follow existing files)
- ESLint configured (`eslint.config.mjs`)
- No Prettier config present

## Configuration Files

- `next.config.ts` - Next.js configuration (includes `typedRoutes: true`, remote image patterns for images.unsplash.com)
- `tsconfig.json` - TypeScript configuration with strict mode
- `eslint.config.mjs` - ESLint rules
- `postcss.config.mjs` - PostCSS/Tailwind CSS configuration
- `components.json` - shadcn/ui component configuration
- `drizzle.config.ts` - Drizzle ORM configuration (schema path, migrations path, PostgreSQL connection)

## Testing

No test framework is currently configured. If adding tests, introduce a framework (e.g., Vitest or Jest) and align naming to `*.test.ts(x)`.
