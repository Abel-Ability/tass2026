# AGENTS.md

TASS Nigeria 2026: a Vite + React 18 conference site (marketing pages plus external form embeds). JavaScript/JSX only, Tailwind CSS, shadcn/ui. Production: https://tasscemri.org.

## Repository layout

- `app/` — the whole Vite app and its toolchain: `src/`, `public/`, `index.html`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vite.config.js`, `jsconfig.json`, `components.json`, `config/`, `scripts/`, `.env.local`.
- `docs/` — project documents (`UPDATE_GUIDE.md`, citation `.docx` files).
- Repo root holds only `AGENTS.md`, `README.md`, and `.gitignore`.
- **Run every pnpm command from `app/`**, not the repo root. The repo root has no `package.json`.
- `.gitignore` stays at the repo root; its patterns (`node_modules`, `dist`, `.env*`) match inside `app/` too.
- Files that tooling locates automatically must stay inside `app/` and must not be moved elsewhere: `index.html` (Vite entry), `package.json` + `pnpm-lock.yaml` + `pnpm-workspace.yaml` (install and framework detection), `vite.config.js`, `jsconfig.json`, `components.json`, `.env.local`. This is why the app is not flattened into the repo root.

## Commands

Run in `app/`. `package.json` pins `pnpm@11.9.0`, but `pnpm` is not on PATH in this environment. Use `corepack pnpm ...` (corepack is installed).

- Install: `cd app; corepack pnpm install --frozen-lockfile`
- After adding or removing dependencies: `cd app; corepack pnpm install --no-frozen-lockfile` (pnpm runs with frozen-lockfile by default here, so the lockfile would otherwise reject the change).
- Dev: `cd app; corepack pnpm dev` (or `app\scripts\start.bat`) -> http://localhost:5173
- Verify: `cd app; corepack pnpm lint` -> `corepack pnpm typecheck` -> `corepack pnpm build`
- Preview: `cd app; corepack pnpm preview`

There is no test suite or CI, so don't invent `pnpm test`. `build` is the only full check.

- `vite.config.js` sets `logLevel: 'error'`, so dev/build can finish with almost no console output. A silent start is normal.
- `build` also copies `dist/index.html` to `dist/404.html` (Vercel SPA fallback) and obfuscates the JS via `rollup-plugin-obfuscator`. Don't remove the copy step or expect readable bundle output. Obfuscator output varies per run, so JS hashes differ between identical builds; CSS output is deterministic.
- `lint` covers all of `src/**` (including `App.jsx`, `main.jsx`, `src/lib`, and hooks) using the `@eslint/js` and `eslint-plugin-react` recommended rule sets plus the project's rules; it skips generated `src/components/ui/**` and build output (`dist/`). The npm script passes `--quiet`, which hides warnings — run `cd app; npx eslint . --config config/eslint.config.js` to see them. `typecheck` uses `checkJs: false`, so it checks syntax and declaration consistency, not types. Neither is a complete safety net.
- `pnpm-lock.yaml` is the only lockfile. pnpm is authoritative; don't add or regenerate an npm lockfile.
- Build-tool configs live in `app/config/`: `tailwind.config.js`, `postcss.config.js` (points Tailwind at `config/tailwind.config.js`), and `eslint.config.js`. `vite.config.js` loads PostCSS from `config/` via `css.postcss`, and the lint scripts pass `--config config/eslint.config.js`.
- `app/scripts/start.bat` is the Windows dev launcher; it `cd`s to `app/` before running `pnpm run dev`.

## Architecture

- Entry: `app/src/main.jsx` -> `app/src/App.jsx`. Routes are declared in `App.jsx` under `app/src/components/conference/Layout.jsx` (Navbar, Footer, ScrollProgress, FloatingSidebar).
- Adding a page requires three edits: create `src/pages/<Name>.jsx`, add a `<Route>` in `src/App.jsx`, and add a nav entry in `src/components/conference/Navbar.jsx`. Navigation is not derived from routes.
- `src/components/home/*` = homepage sections; `src/components/conference/*` = site chrome; `src/components/ui/*` = generated shadcn primitives (don't hand-edit). `@/` maps to `app/src/` in Vite, jsconfig, and components.json.
- Use `@/lib/utils`; `src/utils/index.ts` is unused legacy.
- Styling is shadcn CSS variables in `src/index.css`, not raw brand hex. Use semantic classes: `bg-primary` (navy), `bg-secondary`/`text-secondary` (green), `text-accent`/`bg-gold` (gold). Dark mode is `.dark` on `<html>`, stored as `tass-theme` in localStorage.

## Content and integrations

- No backend or API layer exists in this repo. Fees, tracks, sponsorship tiers, programme, hotels, speakers, and FAQs are inline arrays in `src/pages/*` and components. Edit those directly.
- Registration, themes/abstracts, sponsorship, and hackathon forms are Google Apps Script iframes. Each page hardcodes its own URL at the top (`GAS_URL` / `GAS_REG_URL`) in `Register.jsx`, `Themes.jsx`, `Sponsorship.jsx`, and `Hackathon.jsx`; update each page separately. `VITE_GAS_ENDPOINT` in `app/.env.local` is currently unused.
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
- `app/dist/`, `app/node_modules/`, and all `.env*` files are gitignored. Never commit secrets or build output.

### Vercel

- Production: https://tasscemri.org. Project: `tassnigeria2026`. Team scope: `team_l5KxHP1LNqNZiKnLwTBZ87Ux` (see `.vercel/repo.json`).
- The project's **Root Directory is `app`**, so Vercel installs and builds inside `app/`. The deploy command still runs from the repo root; do not `cd app` before deploying or the CLI will look for a second `app/` folder.
- **Pushing `main` does deploy.** The project is Git-linked to `Abel-Ability/tass2026` with production branch `main`, and every push creates a `source: git` production deployment. Do not run a CLI deploy while that Git build is running: a newer production deployment cancels the in-flight one, so the push shows as `CANCELED`. Pick one path per release.
- History: pushes used to be cancelled 3-4 seconds in and looked like "push does not deploy". Cause was an inverted Ignored Build Step (`if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then exit 0; fi`) — Vercel *skips* the build on exit code `0`, so `main` was always skipped. The setting (`commandForIgnoringBuildStep`) has been cleared; leave it empty.
- Check what happened with:
  ```sh
  npx --yes vercel list --scope team_l5KxHP1LNqNZiKnLwTBZ87Ux
  ```
- A user-level `VERCEL_TOKEN` (`vca_...`) is set on this machine, so deploys no longer need a device login. Shells started before that change must be reopened to see it. Without a token, fall back to the login flow below.
- Deploy explicitly with:
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
- To change project settings from the CLI environment, PATCH the project:
  `curl.exe -X PATCH "https://api.vercel.com/v9/projects/prj_ATOYzVIvi5SbJJJ64IwOivZoYJg7" -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{\"rootDirectory\":\"app\"}'`
- A successful production deploy prints `Aliased https://tasscemri.org`. Verify by comparing the live HTML's CSS asset with `app/dist/assets/` and checking that the live CSS contains the expected rules.
