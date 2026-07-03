# TASS Nigeria 2026 — Update Guide

## Before Starting
1. Run `start.bat` or `pnpm run dev` to start the local server
2. Open http://localhost:5173 to preview changes

## What to Tell the Assistant
- Which page/component to modify (e.g. "Update the About page")
- What change to make (e.g. "Replace the photo", "Add a new section", "Fix the layout")
- Any new content (text, images, URLs, documents)

## For New Sections
- Where it goes (e.g. "After the Registration Includes section")
- Brand colours: green `#0a5c36`, gold `#f4c430`
- Whether it needs a modal, iframe, or external link

## For New Pages
- Page name and route (e.g. `/speakers`)
- Content to include
- Whether it needs a nav link

## For Images/Files
- Provide a URL or place the file in the `public/` folder
- Specify the filename and alt text

## After Changes
1. Ask to **verify build** (`pnpm run build`)
2. Ask to **push to GitHub** — Vercel auto-deploys to https://tasscemri.org
3. Ask to **save this version** (git commit)

## Quick Commands

| Task | Command |
|------|---------|
| Start server | "run localhost" |
| Save changes | "save this version" |
| Deploy | "push to github" |
| Fix a bug | "fix [describe the issue]" |
| Add section | "add a [type] section on the [page] page" |
| Undo | "undo the last action" |

## Key Info
- **Live site**: https://tasscemri.org
- **GitHub repo**: https://github.com/Abel-Ability/tass2026
- **Vercel project**: tassnigeria2026
- **Branch**: main (always push here)
- **Package manager**: pnpm
- **Framework**: React 18 + Vite + Tailwind CSS
