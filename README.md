# TASS Nigeria 2026

Technology. Arts. Science. Society.

International Conference on Multidisciplinary Research, Innovation \& Sustainable Development.

Production site: https://tasscemri.org

## Layout

- `app/` — the Vite + React application. Run every command from here.
- `docs/` — project documents.

## Run locally

```sh
cd app
corepack pnpm install
corepack pnpm dev
```

Or double-click `app\scripts\start.bat`. Then open http://localhost:5173.

## Build

```sh
cd app
corepack pnpm build
```

## Deploy

Vercel is Git-linked to this repository on branch `main`, with `app` as the project's Root Directory.

Pushing to `main` deploys automatically to https://tasscemri.org:

```sh
git push origin main
```

Do not also run a CLI deploy while that build is in flight: the newer production deployment cancels the Git one, so the push shows as `CANCELED`.

Check the result with:

```sh
npx --yes vercel list --scope team_l5KxHP1LNqNZiKnLwTBZ87Ux
```
