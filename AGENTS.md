# AGENTS.md

TASS Nigeria 2026: a Vite + React 18 conference site (marketing pages plus external form embeds). JavaScript/JSX only, Tailwind CSS, shadcn/ui. Production: https://tasscemri.org.

## Commands

`package.json` pins `pnpm@11.9.0`, but `pnpm` is not on PATH in this environment. Use `corepack pnpm ...` (corepack is installed).

- Install: `corepack pnpm install --frozen-lockfile`
- Dev: `corepack pnpm dev` (or `start.bat`) -> http://localhost:5173
- Verify: `corepack pnpm lint` -> `corepack pnpm typecheck` -> `corepack pnpm build`
- Preview: `corepack pnpm preview`

There is no test suite or CI, so don't invent `pnpm test`. `build` is the only full check.

- `vite.config.js` sets `logLevel: 'error'`, so dev/build can finish with almost no console output. A silent start is normal.
- `build` also copies `dist/index.html` to `dist/404.html` (Vercel SPA fallback) and obfuscates the JS via `rollup-plugin-obfuscator`. Don't remove the copy step or expect readable bundle output.
- `lint` only covers `src/components/**`, `src/pages/**`, and a nonexistent `src/Layout.jsx`; it ignores `src/lib`, `src/components/ui`, `App.jsx`, `main.jsx`, and hooks. `typecheck` uses `checkJs: false`. Neither is a complete safety net.
- Both `pnpm-lock.yaml` and `package-lock.json` exist, and `base44/config.jsonc` mentions npm. pnpm is authoritative; don't regenerate the npm lockfile.

## Architecture

- Entry: `src/main.jsx` -> `src/App.jsx`. Routes are declared in `App.jsx` under `src/components/conference/Layout.jsx` (Navbar, Footer, ScrollProgress, FloatingSidebar).
- Adding a page requires three edits: create `src/pages/<Name>.jsx`, add a `<Route>` in `src/App.jsx`, and add a nav entry in `src/components/conference/Navbar.jsx`. Navigation is not derived from routes.
- `src/components/home/*` = homepage sections; `src/components/conference/*` = site chrome; `src/components/ui/*` = generated shadcn primitives (don't hand-edit). `@/` maps to `src/` in Vite, jsconfig, and components.json.
- Use `@/lib/utils`; `src/utils/index.ts` is unused legacy.
- Styling is shadcn CSS variables in `src/index.css`, not raw brand hex. Use semantic classes: `bg-primary` (navy), `bg-secondary`/`text-secondary` (green), `text-accent`/`bg-gold` (gold). Dark mode is `.dark` on `<html>`, stored as `tass-theme` in localStorage.

## Content and integrations

- No backend or API layer exists in this repo. Fees, tracks, sponsorship tiers, programme, hotels, speakers, and FAQs are inline arrays in `src/pages/*` and components. Edit those directly.
- Registration, themes/abstracts, sponsorship, and hackathon forms are Google Apps Script iframes. Each page hardcodes its own URL at the top (`GAS_URL` / `GAS_REG_URL`) in `Register.jsx`, `Themes.jsx`, `Sponsorship.jsx`, and `Hackathon.jsx`; update each page separately. `VITE_GAS_ENDPOINT` in `.env.local` is currently unused.
- The contact form posts to Formspree (`src/pages/Contact.jsx`).
- The LOC list is fetched at runtime from `public/LOC.csv` (`name,position` per line) by `src/pages/About.jsx`.
- Assets in `public/` are referenced as root paths (`/logo-uniabuja.png`) or `import.meta.env.BASE_URL + ...`. Keep the BASE_URL form so `VITE_BASE_PATH` subpath builds still work.
- `useAntiClone` in `App.jsx` blocks right-click, F12, devtools shortcuts, and image dragging, including during local development. Remove or bypass it only when the task requires it.
- Gallery images are remote `media.base44.com` URLs, not files in `public/`.

## Deploy

- Branch `main`, remote `https://github.com/Abel-Ability/tass2026.git`, Vercel project `tassnigeria2026` (`.vercel/repo.json`). `UPDATE_GUIDE.md` says pushes to `main` auto-deploy; `README.md` also documents `npx vercel --prod --yes`.
- On this machine, git commands fail with "dubious ownership" until this is run once: `git config --global --add safe.directory "D:/Website Projects/tass2026"`.
