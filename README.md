# Chuck Chuckle Plan

Minimal implementation plan for a production-ready TypeScript client app that consumes Chuck Norris jokes through GraphQL Mesh.

## Architecture (Vite+ Monorepo)

```txt
apps/
  website/          # React + shadcn + Apollo client (UI)
  mesh/             # GraphQL Mesh serverless adapter
packages/
  contracts/        # generated GraphQL schema/types/documents
```

## Runtime Shape

- `apps/website` is a static client build.
- `apps/mesh` is deployed as serverless functions and wraps `https://api.chucknorris.io/`.
- The website calls Mesh GraphQL only (no direct REST from browser).

## Client Design

- Apollo Client is used for both API data and local UI state.
- No Zustand; local state is stored in Apollo cache.
- No React Router; use Vite-native multi-page setup:
  - `index.html` for jokes
  - `favorites.html` for favorites
- Favorites persist with localStorage-backed Apollo cache persistence.

## Functional Plan

1. On load, query 10 random jokes and render list.
2. Timer toggle starts/stops 5s polling for one joke.
3. On each tick, append new joke and remove oldest (keep max 10 visible).
4. Allow favoriting with max 10 favorites.
5. Render favorites on separate page and allow removal.
6. Restore favorites after refresh.

## Duplicate Joke Strategy

- Deduplicate by `id` against visible list.
- Retry fetch up to a small fixed number of attempts.
- If still duplicate, accept and document fallback behavior.

## Minimal Project Structure (Website)

```txt
apps/website/
  index.html
  favorites.html
  src/
    main-jokes.tsx
    main-favorites.tsx
    apollo/
      client.ts
      cache.ts
      local-state.ts
    pages/
      jokes-page.tsx
      favorites-page.tsx
    features/
      jokes/
      favorites/
      timer/
    components/
```

## Minimal Project Structure (Mesh)

```txt
apps/mesh/
  mesh.config.ts
  src/
    handler.ts
```

## Quality Gates

- Unit tests for queue logic, favorites cap, persistence, and timer behavior.
- Optional component tests for loading/error states.
- CI pipeline runs install, lint/check, test, and build.

## Vite+ Commands

```bash
vp install
vp check
vp test
vp run build -r
vp run dev
```

## Automation

- GitHub Actions workflows:
  - `.github/workflows/validate.yml`
  - `.github/workflows/deploy-website.yml`
  - `.github/workflows/deploy-mesh.yml`
- Validation runs on pull requests and pushes to `main`:
  - `vp install`
  - `vp check`
  - `vp run test -r`
  - `vp run build -r`
- Deployments run after successful validation on `main`:
  - website deploys `apps/website/dist` to GitHub Pages
  - mesh deploys `apps/mesh` to Vercel (when mesh secrets are configured)

### Required repository setup

1. Enable GitHub Pages with source set to **GitHub Actions**.
2. Add repository variable `VITE_MESH_ENDPOINT` with your deployed Mesh GraphQL URL.
3. Add mesh deployment secrets for Vercel:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_MESH_PROJECT_ID`
