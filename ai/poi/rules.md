# Agent Rules

- Prefer type safety; use `any` only when there is no reasonable alternative and explain why.
- Prefer type inference; avoid redundant type annotations.
- Avoid `@ts-ignore`; use `@ts-expect-error` with a brief reason when unavoidable.
- Use `unknown` for untrusted data and narrow before use.
- Keep changes minimal and consistent with existing project patterns.
- Use shadcn/ui components for UI where applicable.
- If a component is used more than 2 times or is likely to be reused, extract it into a reusable component.
- Apply the reusability rule to repeated code patterns too (arrays + map instead of repeated markup).
- When creating arrays or objects, always annotate them with an explicit type.
- Never use hardcoded colors; use theme colors from `app/globals.css` only.
- Organize UI by feature: `feature/<name>/components`, `feature/<name>/sections`, `feature/<name>/data`.
- Categories and products are separate features; landing only composes them.
- Card styling should be centralized in the `Card` component; only allow local overrides like `pt-0` for edge cases.
