# Valti Shop Front-End — Agent Guide

## Stack (Vue 3 SPA)

- Vue 3 Composition API (`<script setup lang="ts">`), TypeScript
- Vuetify 4 (icons: `mdi-*`), Pinia, Vue Router 5
- Vite 7, vue-tsc, Vitest (jsdom), ESLint + oxlint, Prettier

## Commands (run from `vue-project/`)

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check then build (`run-p type-check "build-only"`) |
| `npm run test:unit` | Vitest (single test: `npx vitest --run src/__tests__/App.spec.ts`) |
| `npm run type-check` | `vue-tsc --build` |
| `npm run lint` | `oxlint . --fix` then `eslint . --fix --cache` |
| `npm run format` | `prettier --write src/` |

Always run **lint → type-check → test** before committing.

## Conventions

| What | Rule |
|---|---|
| Code language | English |
| Menu labels | Spanish, capitalized |
| File names | `kebab-case` |
| Vue components | PascalCase |
| Route paths | kebab-case, no trailing slash |
| Route names | `camelCase` |
| Route loading | Lazy: `() => import('@/pages/...')` |
| Imports from src | `@/` alias (maps to `./src`) |
| End of line | LF |
| Indent | 2 spaces |
| Format on save | Prettier (VS Code configured) |

## Architecture

- Entry: `src/main.ts` — mounts Vue app with Vuetify, Pinia, Router
- Pages live under `src/pages/<category>/` (organised by feature, not type)
- Router: `src/router/index.ts` (currently empty — add routes here)
- Stores: `src/stores/` via Pinia (composition API style with `defineStore`)
- Tests: `src/__tests__/` with `@vue/test-utils`
- Fully responsive (desktop, tablet, mobile)
- Connects to a REST API (SPA pattern)