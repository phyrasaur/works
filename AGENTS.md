# Works Repository Guidance

## Environment

- Use Ubuntu WSL with the repository under `/home`, never `/mnt`.
- Use Linux-native commands. `node`, `pnpm`, `git`, and build tools must not resolve through `/mnt/c`.
- Required versions are Node `>=22.12.0` and the exact pnpm version in `package.json`.
- Install system packages with `sudo apt`; do not use `sudo` for dependency installation, builds, generated files, or repository edits.

## Project

- This is an Astro 6 portfolio deployed through the Cloudflare adapter and Wrangler.
- Install dependencies with `pnpm install --frozen-lockfile`.
- Start development with `pnpm dev`.
- Run `pnpm verify` before considering code changes complete.
- Run `pnpm verify:full` when a change affects frontend behavior or rendering.
- Run `pnpm test:e2e` for frontend changes; it checks every route at desktop and mobile sizes.
- Run `pnpm debug:site` when traces and screenshot artifacts are needed.
- Use `pnpm test:e2e:headed` or `pnpm test:e2e:debug` only when WSLg is available.
- Run `pnpm env:check:network` when diagnosing dependency or network access.
- Run `pnpm env:check:deploy` before deployment work.

## Permissions And Safety

- Codex user defaults may request full access, but verify actual write and network access in each session.
- Do not deploy, alter credentials, run destructive Git commands, or delete user data without an explicit user request.
- Keep GitHub and Cloudflare tokens in their native user credential stores. Never print or commit secrets.
- Preserve unrelated user changes in a dirty worktree.

## Verification

- The standard verification sequence is environment preflight, Prettier check, Astro type check, and production build.
- For frontend changes, run Playwright and inspect its screenshots or trace for the affected routes.
- Treat console errors, failed requests, broken images, horizontal overflow, and serious Axe violations as failures.
- The Cloudflare adapter is authoritative even though most pages are static.
