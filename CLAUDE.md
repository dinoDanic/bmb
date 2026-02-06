# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 App Router project with TypeScript, React 19, Tailwind CSS v4, and shadcn/ui components. The project uses pnpm for package management and follows a feature-based architecture.

## Development Commands

```bash
# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Run production server (requires build first)
pnpm start

# Linting
pnpm lint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages, layouts, and global styles
  - `app/page.tsx` - Root page
  - `app/layout.tsx` - Root layout with font configuration
  - `app/globals.css` - Global styles and Tailwind theme variables

- `features/` - Feature-based modules organized by domain
  - Each feature may contain: `components/`, `sections/`, `data/`, `api/`, `hooks/`, `helpers/`
  - `features/admin/` - Admin panel features (auth, categories, products, product-details, seed)
  - Features are composable; landing page composes categories and products features

- `components/` - Shared React components
  - `components/ui/` - shadcn/ui primitives (button, card, input, etc.)
  - Shared components used across multiple features

- `lib/` - Utilities and shared logic
  - `lib/utils.ts` - Utility functions (includes `cn()` for className merging)
  - `lib/types.ts` - Shared TypeScript types

- `public/` - Static assets served at site root

### Path Aliases

The project uses `@/*` path aliases (configured in `tsconfig.json`):
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### UI Component System

- Uses shadcn/ui with "base-maia" style variant
- Icon library: Hugeicons (`@hugeicons/react`)
- Component configuration in `components.json`
- All UI components use Base UI React (`@base-ui/react`)
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
- Always annotate arrays and objects with explicit types when creating them
- **CRITICAL: Never duplicate types - always reuse existing types from their source**
  - For database data: Use Drizzle's `$inferInsert` or `$inferSelect` from schema files
  - For API responses: Import and reuse types from the API route or shared types
  - For components: Import prop types from the component definition
  - Example: `type CategoryInsert = typeof categories.$inferInsert`

### React

- Functional components only
- React 19 with RSC (React Server Components) enabled
- File naming: kebab-case for components (e.g., `component-example.tsx`)

### Styling

- Tailwind CSS v4 with CSS variables for theming
- Never use hardcoded colors; use theme colors from `app/globals.css` only
- Keep utility classes readable and grouped
- Card styling centralized in `Card` component; only allow local overrides like `pt-0` for edge cases
- Use `cn()` helper from `lib/utils.ts` for conditional/merged classNames

### Code Organization

- Keep changes minimal and consistent with existing patterns
- Extract components used more than 2 times or likely to be reused
- Apply reusability to repeated code patterns (use arrays + map instead of repeated markup)
- Organize by feature: `features/<name>/components`, `features/<name>/sections`, `features/<name>/data`
- Categories and products are separate features; landing only composes them

### Formatting

- Indentation: 2 spaces (follow existing files)
- ESLint configured (`eslint.config.mjs`)
- No Prettier config present

## Configuration Files

- `next.config.ts` - Next.js configuration (includes remote image patterns for images.unsplash.com)
- `tsconfig.json` - TypeScript configuration with strict mode
- `eslint.config.mjs` - ESLint rules
- `postcss.config.mjs` - PostCSS/Tailwind CSS configuration
- `components.json` - shadcn/ui component configuration

## Testing

No test framework is currently configured. If adding tests, introduce a framework (e.g., Vitest or Jest) and align naming to `*.test.ts(x)`.

## Additional Resources

This project maintains Points of Interest (POI) documentation in the `ai/poi/` directory for AI agents. Key files include:
- `ai/poi/rules.md` - Detailed agent rules and constraints
- `ai/poi/project-structure.md` - Project organization
- `ai/poi/commands.md` - Development commands
- `ai/poi/code-style.md` - Code style guidelines

Refer to `AGENTS.md` for the POI index.
