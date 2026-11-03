# Design Prototype Template

> **Looking for the search + NIVA prototype?** See [`prototypes/nc-search-key-flow/README.md`](prototypes/nc-search-key-flow/README.md) for how to run it (`pnpm install`, then `./prototypes/nc-search-key-flow/start.sh`, then http://localhost:3010).

A Turborepo monorepo for rapid prototyping with Nutanix's design system. Contains a React frontend (`web`) and a Hono API server (`api`), with shared configuration for TypeScript, ESLint, and Prettier.

## Repository Structure

```
.
├── apps/
│   ├── web/                          # React frontend (Vite + TanStack Router)
│   │   ├── src/
│   │   │   ├── routes/               # File-based routes
│   │   │   ├── components/           # Reusable React components
│   │   │   ├── stores/               # Zustand state management
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── styles/               # Global styles and design tokens
│   │   │   ├── lib/                  # Utility functions
│   │   │   └── integrations/         # Third-party integrations (TanStack Query)
│   │   ├── public/                   # Static assets
│   │   ├── tsconfig.json             # Extends @repo/typescript-config/react-app.json
│   │   ├── eslint.config.js          # Extends @repo/eslint-config/react
│   │   ├── prettier.config.js        # Extends @repo/prettier-config
│   │   └── vite.config.ts            # Vite config with API proxy
│   └── api/                          # Hono API server (Node.js)
│       ├── src/
│       │   └── index.ts              # Server entry point
│       ├── tsconfig.json             # Extends @repo/typescript-config/node.json
│       ├── eslint.config.js          # Extends @repo/eslint-config/node
│       └── prettier.config.js        # Extends @repo/prettier-config
├── packages/
│   ├── typescript-config/            # Shared TypeScript configs
│   │   ├── base.json                 # Strict base config (all apps extend this)
│   │   ├── react-app.json            # React/Vite apps (DOM, JSX, bundler mode)
│   │   └── node.json                 # Node.js apps (NodeNext, emit to dist)
│   ├── eslint-config/                # Shared ESLint configs
│   │   ├── base.js                   # Common rules (TS, Unicorn)
│   │   ├── react.js                  # React apps (+ TanStack, CSS linting)
│   │   └── node.js                   # Node.js apps
│   └── prettier-config/              # Shared Prettier config
│       └── prettier.config.js        # Single quotes, no semicolons, trailing commas
├── turbo.json                        # Turborepo task orchestration
├── pnpm-workspace.yaml               # Workspace package declarations
├── .husky/
│   ├── pre-commit                    # lint-staged (format + lint staged files)
│   └── pre-push                      # turbo typecheck (full type check)
└── package.json                      # Root scripts, lint-staged config, husky
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

```bash
# Start both web (port 3000) and API (port 3001) servers
pnpm dev

# Start only the web frontend
pnpm turbo run dev --filter=web

# Start only the API server
pnpm turbo run dev --filter=api
```

The web app's Vite dev server proxies `/api/*` requests to the API server, so you can call API endpoints from the frontend without CORS issues during development.

### Building

```bash
# Build all apps
pnpm build

# Build a specific app
pnpm turbo run build --filter=web
pnpm turbo run build --filter=api

# Preview the web production build
pnpm turbo run serve --filter=web

# Start the API production server
cd apps/api && pnpm start
```

## Scripts

All root scripts run across both apps via Turborepo:

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start all dev servers in parallel    |
| `pnpm build`       | Build all apps                       |
| `pnpm lint`        | Lint all apps                        |
| `pnpm lint:fix`    | Auto-fix lint errors across all apps |
| `pnpm format`      | Format all files with Prettier       |
| `pnpm format:lint` | Format + lint fix in one command     |
| `pnpm typecheck`   | Type check all apps                  |
| `pnpm check`       | Run lint + typecheck together        |

## Tech Stack

### Web (`apps/web`)

- **React 18** with TypeScript
- **Vite** for dev server and bundling
- **TanStack Router** for type-safe, file-based routing
- **TanStack Query** for server state and data fetching
- **Zustand** for client state management
- **Nutanix Prism UI** (`@nutanix-ui/prism-reactjs`) for enterprise-grade components
- **Vitest** for testing

### API (`apps/api`)

- **Hono** with `@hono/node-server` for the Node.js runtime
- **CORS middleware** configured for the web frontend
- **Logger middleware** for request logging
- **TypeScript** compiled with `tsc`, dev mode via `tsx watch`

### API Endpoints

| Method | Path          | Description                               |
| ------ | ------------- | ----------------------------------------- |
| GET    | `/api/health` | Health check (returns status + timestamp) |
| GET    | `/api/hello`  | Sample JSON endpoint                      |

### Shared Tooling

- **Turborepo** for monorepo task orchestration and caching
- **pnpm workspaces** for package management
- **TypeScript** with shared strict base config
- **ESLint 9** (flat config) with TypeScript, Unicorn, and TanStack plugins
- **Prettier** with shared formatting rules
- **Husky** + **lint-staged** for git hooks

## Git Hooks

| Hook           | Action                                                       |
| -------------- | ------------------------------------------------------------ |
| **Pre-commit** | Runs lint-staged: ESLint fix + Prettier on staged files only |
| **Pre-push**   | Runs `turbo typecheck` across all apps                       |

## Shared Configuration

All apps extend shared configs from `packages/` to ensure consistency:

- **TypeScript**: `@repo/typescript-config` provides `base.json` (strict defaults), `react-app.json` (DOM + JSX + bundler), and `node.json` (NodeNext + emit)
- **ESLint**: `@repo/eslint-config` provides `base` (TS + Unicorn rules), `react` (+ TanStack + CSS linting), and `node` configs
- **Prettier**: `@repo/prettier-config` exports shared formatting (single quotes, no semicolons, trailing commas)

## Creating a New Page

1. Create a file in `apps/web/src/routes/`, e.g., `apps/web/src/routes/my-page.tsx`
2. TanStack Router auto-generates the route
3. Navigate to `http://localhost:3000/my-page`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Title, StackingLayout, Button } from '@nutanix-ui/prism-reactjs'

export const Route = createFileRoute('/my-page')({
  component: MyPage,
})

function MyPage() {
  return (
    <StackingLayout itemGap="M">
      <Title size="h1">My New Page</Title>
      <Button>Click Me</Button>
    </StackingLayout>
  )
}
```

## Adding an API Endpoint

Add routes in `apps/api/src/index.ts`:

```ts
app.get('/api/my-endpoint', (c) => {
  return c.json({ data: 'Hello!' })
})
```

The web app can call it directly via `/api/my-endpoint` during development (Vite proxy handles forwarding to port 3001).

## Learn More

- [Nutanix Design System](http://prism-styleguide/v2/index.html)
- [Turborepo Docs](https://turborepo.dev/docs)
- [Hono Documentation](https://hono.dev/docs)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vite.dev/guide/)
