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

The Vercel project uses `app` as its Root Directory.

Push to https://github.com/Abel-Ability/tass2026, then deploy from the repo root with the Vercel CLI:

```sh
npx vercel --prod --yes
```

Update GitHub tokens https://github.com/settings/tokens
