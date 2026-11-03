# Project Notes

This is a Turborepo + pnpm workspace.

## Workspace Map

- `apps/web`: React frontend, Vite, TanStack Router, port 3000.
- `apps/api`: Hono API server, Node.js + `tsx`, port 3001.
- `packages/typescript-config`: shared TS configs.
- `packages/eslint-config`: shared ESLint flat configs.
- `packages/prettier-config`: shared Prettier config.
- `.agents/skills`: project skills for Prism, EBR, and Hono work.

<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `pnpm dlx @tanstack/intent@latest list` from the workspace root, not from an individual app or package directory.
- Skill guidance: if one local skill clearly matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Local Conventions

- Run workspace tasks from the repo root.
- Target an app with `pnpm turbo run <task> --filter=<app>`.
- Frontend source lives in `apps/web/src`; API source lives in `apps/api/src`.
- Web path alias `~` resolves to `apps/web/src`.
- Vite proxies `/api/*` and selected `/PrismGateway/*` calls to the API server.
- API routes use `/api/*`; Prism Gateway mock routes use `/PrismGateway/services/rest/v1/*`.
- Hono setup is in `apps/api/src/app.ts`; the server entrypoint is `apps/api/src/index.ts`; top-level route registration is in `apps/api/src/routes/index.ts`.

## Best Practices

- Start with the smallest useful change and build from existing repo patterns.
- Prefer Prism components, shared configs, and local helpers over custom one-offs.
- Keep feature code organized by ownership: component folders for UI, `lib` for reusable utilities, and `types` for shared contracts.
- Always ask when product behavior is unclear; otherwise choose the simplest maintainable option.

## Verify

- `pnpm lint`
- `pnpm typecheck`
