# Agent Rules

- Prefer type safety; use `any` only when there is no reasonable alternative and explain why.
- Prefer type inference; avoid redundant type annotations.
- Avoid `@ts-ignore`; use `@ts-expect-error` with a brief reason when unavoidable.
- Use `unknown` for untrusted data and narrow before use.
- Keep changes minimal and consistent with existing project patterns.
- Use shadcn/ui components for UI where applicable.
