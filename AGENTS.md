# AGENTS.md

TASS Nigeria 2026 conference site: Vite 6 + React 18, JavaScript/JSX (the only `.ts` file is an unused legacy util), Tailwind 3, shadcn/ui. Production: https://tasscemri.org, deployed by Vercel from this GitHub repo.

## Layout and commands

- `app/` is the entire Vite app. **Run every command from `app/`**; the repo root has no `package.json`.
- `certificate-apps-script/` is a standalone Google Apps Script certificate issuer, deployed by hand (see its `README.md`). Vite does not build it.
- `docs/` holds `UPDATE_GUIDE.md` and citation `.docx` files.
- `pnpm` is not on PATH. Use `corepack pnpm ...`:
  - install: `cd app; corepack pnpm install` (add `--no-frozen-lockfile` after editing dependencies)
  - dev: `cd app; corepack pnpm dev` (or `app\scripts\start.bat`) → http://localhost:5173
  - verify: `cd app; corepack pnpm lint` → `corepack pnpm typecheck` → `corepack pnpm build`
- `pnpm-lock.yaml` is the only lockfile; don't add an npm/yarn lockfile. There is no test suite and no CI — don't invent `pnpm test`; `build` is the main check.

## Build and verification quirks

- `vite.config.js` sets `logLevel: 'error'`, so dev/build can finish with almost no output. A silent start is normal.
- `build` = `vite build` then copies `dist/index.html` to `dist/404.html`. JS is **not** obfuscated anymore; `javascript-obfuscator` and `rollup-plugin-obfuscator` remain in `devDependencies` but nothing uses them.
- `lint` skips generated `src/components/ui/**` and `dist/`. The npm script passes `--quiet`, which hides warnings — run `cd app; npx eslint . --config config/eslint.config.js` for the full list.
- `typecheck` (`tsc -p jsconfig.json`) has `checkJs: false` and only includes `src/components/**/*.jsx` and `src/pages/**/*.jsx` (plus a stale `src/Layout.jsx` entry); `App.jsx`, `main.jsx`, `src/lib`, and `src/hooks` are not checked. It catches syntax problems, not type errors.
- Build configs live in `app/config/`: `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`. `vite.config.js` loads PostCSS from that folder and the lint scripts pass `--config config/eslint.config.js`.

## Architecture

- `src/main.jsx` → `src/App.jsx`. Routes live in `App.jsx` inside `<Layout>` (`src/components/conference/Layout.jsx` = Navbar, Footer, ScrollProgress, FloatingSidebar, audio).
- Adding a page takes four edits:
  1. `src/pages/<Name>.jsx`
  2. `<Route>` in `src/App.jsx`
  3. entry in `navLinks` in `src/components/conference/Navbar.jsx` (navigation is not derived from routes)
  4. a rewrite in `app/vercel.json` — production only serves the paths listed there, so without one a direct load of the new URL returns `404.html` with a 404 status instead of 200.
- `@/` maps to `app/src/` (Vite alias, `jsconfig.json`, `components.json`). Use `@/lib/utils`; `src/utils/index.ts` is unused.
- `src/components/ui/*` are generated shadcn primitives — don't hand-edit. `src/components/home/*` = homepage sections; `src/components/conference/*` = site chrome; `src/components/audio/*` = background jingles plus mute button.

## Styling

- Use shadcn CSS variables in `src/index.css`, not raw hex: `bg-primary` (navy), `text-accent`/`bg-gold` (gold), `bg-secondary`/`text-secondary` (green in light mode, blue in dark). Tailwind also defines `gold`, `navy`, and `font-heading|body|display|mono`.
- Dark mode is `.dark` on `<html>`, persisted as `tass-theme` in localStorage.

## Content and integrations

- No backend or database. Fees, tracks, programme, hotels, speakers, and FAQs are inline arrays in `src/pages/*` and components — edit them there.
- Registration, themes/abstracts, sponsorship, and hackathon are Google Apps Script iframes; each page defines its own URL (`GAS_REG_URL` in `Register.jsx`, `GAS_URL` in `Themes.jsx`, `Sponsorship.jsx`, `Hackathon.jsx`). `VITE_GAS_ENDPOINT` is unused.
- The certificate portal is a separate GAS web app opened from `FloatingSidebar` via `CertificateModal.jsx`. Both modals use the deployment URL in `src/lib/certificatePortal.js`: issuance at `?embed=true`, verification at `?verify=<cert-no>` (also what QR codes point to). Every verification appends to the `Verification Log` tab in the register spreadsheet. `Code.gs` must return `setXFrameOptionsMode(ALLOWALL)` or the iframes stay blank. Deploy it manually per `certificate-apps-script/README.md`.
- Contact form posts to Formspree; the LOC list is fetched at runtime from `public/LOC.csv` (`name,position` per line) in `About.jsx`.
- `app/vercel.json` sets security headers and a CSP. It allows frames only from `script.google.com`/`googleusercontent.com`, images only from a fixed host list (e.g. `media.base44.com`), and form posts to Formspree — adding an embed, image host, or font origin requires updating that CSP.
- Public assets use `import.meta.env.BASE_URL + ...` so `VITE_BASE_PATH` subpath builds keep working. Gallery images are remote `media.base44.com` URLs, not files in `public/`.
- `useAntiClone` in `App.jsx` blocks right-click, F12/devtools shortcuts, Ctrl+S/P/U, and image dragging, including in local dev. Bypass it only when the task requires it.

## Git and deploy

- Git needs the safe-directory entry for this path; prefix commands with `git -c safe.directory="D:/Website Projects/tass2026" ...` (or register it once).
- **Pushing `main` deploys** the site: Vercel is Git-linked with production branch `main`. Don't run a CLI deploy while that build is in flight — the newer deployment cancels the Git one and the push shows `CANCELED`.
- Vercel project `tassnigeria2026`, team `team_l5KxHP1LNqNZiKnLwTBZ87Ux` (see `.vercel/repo.json`), **Root Directory `app`**. Run deploy commands from the repo root, not from `app/`.
- Keep the project's Ignored Build Step empty: Vercel *skips* a build when that command exits `0`.
- Check deployments: `npx --yes vercel list --scope team_l5KxHP1LNqNZiKnLwTBZ87Ux`. A user-level `VERCEL_TOKEN` is usually set on this machine; otherwise run `npx --yes vercel login`.
- `app/dist/`, `app/node_modules/`, and all `.env*` files are gitignored. Never commit build output or secrets.
