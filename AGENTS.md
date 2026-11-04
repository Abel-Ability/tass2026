# AGENTS.md

TASS Nigeria 2026: a Vite + React 18 conference site (marketing pages plus external form embeds). JavaScript/JSX only, Tailwind CSS, shadcn/ui. Production: https://tasscemri.org.

## Commands

`package.json` pins `pnpm@11.9.0`, but `pnpm` is not on PATH in this environment. Use `corepack pnpm ...` (corepack is installed).

- Install: `corepack pnpm install --frozen-lockfile`
- Dev: `corepack pnpm dev` (or `scripts\start.bat`) -> http://localhost:5173
- Verify: `corepack pnpm lint` -> `corepack pnpm typecheck` -> `corepack pnpm build`
- Preview: `corepack pnpm preview`

There is no test suite or CI, so don't invent `pnpm test`. `build` is the only full check.

- `vite.config.js` sets `logLevel: 'error'`, so dev/build can finish with almost no console output. A silent start is normal.
- `build` also copies `dist/index.html` to `dist/404.html` (Vercel SPA fallback) and obfuscates the JS via `rollup-plugin-obfuscator`. Don't remove the copy step or expect readable bundle output.
- `lint` only covers `src/components/**`, `src/pages/**`, and a nonexistent `src/Layout.jsx`; it ignores `src/lib`, `src/components/ui`, `App.jsx`, `main.jsx`, and hooks. `typecheck` uses `checkJs: false`. Neither is a complete safety net.
- `pnpm-lock.yaml` is the only lockfile. pnpm is authoritative; don't add or regenerate an npm lockfile.
- Build-tool configs live in `config/`: `tailwind.config.js`, `postcss.config.js` (points Tailwind at `config/tailwind.config.js`), and `eslint.config.js`. `vite.config.js` loads PostCSS from `config/` via `css.postcss`, and the lint scripts pass `--config config/eslint.config.js`.
- Files that tools locate automatically must stay at the repo root: `index.html`, `package.json`, `vite.config.js`, `jsconfig.json`, `components.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.env.local`, `.gitignore`.
- `scripts\start.bat` is the Windows dev launcher; it `cd`s to the repo root before running `pnpm run dev`.

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

### GitHub

- Branch `main`, remote `https://github.com/Abel-Ability/tass2026.git`.
- Git refuses this checkout until the safe directory is registered (run once):
  `git config --global --add safe.directory "D:/Website Projects/tass2026"`
  Alternatively prefix commands with `git -c safe.directory="D:/Website Projects/tass2026" ...`.
- Commit and push:
  ```sh
  git add <files>
  git commit -m "<message>"
  git push origin main
  ```
- `dist/`, `node_modules/`, and `.env*` are gitignored. Never commit secrets or build output.

### Vercel

- Production: https://tasscemri.org. Project: `tassnigeria2026`. Team scope: `team_l5KxHP1LNqNZiKnLwTBZ87Ux` (see `.vercel/repo.json`).
- Do not rely on a GitHub push to deploy. Despite the note in `docs/UPDATE_GUIDE.md`, pushing `main` did not trigger a Vercel deployment. After pushing, deploy explicitly.
- Vercel CLI is not installed globally and is not logged in on this machine. Use `npx --yes vercel ...`.
- If `VERCEL_TOKEN` is set, deploy with:
  ```sh
  npx --yes vercel deploy --prod --yes --token $env:VERCEL_TOKEN --scope team_l5KxHP1LNqNZiKnLwTBZ87Ux
  ```
- Once the CLI is logged in, omit `--token`:
  ```sh
  npx --yes vercel deploy --prod --yes --scope team_l5KxHP1LNqNZiKnLwTBZ87Ux
  ```
- If not authenticated, run `npx --yes vercel login --debug` in the background and give the user the `https://vercel.com/oauth/device?user_code=...` URL to approve. If CLI polling fails with `fetch failed`, extract `device_code` from the debug output and exchange it for an access token:
  ```sh
  curl.exe -sS -X POST "https://api.vercel.com/login/oauth/token" -H "Content-Type: application/x-www-form-urlencoded" --data "client_id=cl_HYyOPBNtFMfHhaUn9L4QPfTZz6TP47bp&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code&device_code=<DEVICE_CODE>"
  ```
  Pass the returned `access_token` to `vercel deploy --token`; never print or commit it. Device codes expire after about 10 minutes.
- A successful production deploy prints `Aliased https://tasscemri.org`. Verify by comparing the live HTML's CSS asset with the newest file in `dist/assets/` and checking that the live CSS contains the expected rules.
