# Works

Personal portfolio site for **Firas Razak**, focused on product design, product management, service design, and multidisciplinary case studies.

Built with [Astro](https://astro.build/) as a mostly-static, fast-loading portfolio. The current homepage presents a hero section, showcase cards, and contact/about section.

## Featured work

The homepage currently highlights three showcase projects:

- **Hyperprint** — branding printshop customer experience
- **DonAid** — donation tracking and audit conceptualisation
- **Wishful Menu** — democratic menu planning for a restaurant experience

## Tech stack

- **Astro 6**
- **TypeScript** via Astro strict config
- **PNPM** for package management
- **Prettier** with `prettier-plugin-astro`
- **Local font loading** through Astro font assets
- **Static assets** in `src/images`, `src/graphics`, and `public`

## Requirements

```sh
node >= 22.12.0
pnpm 10.33.2
```

## Getting started

Install dependencies:

```sh
pnpm install --frozen-lockfile
```

Start the local dev server:

```sh
pnpm dev
```

Astro will serve the site at:

```txt
http://localhost:4321
```

## Available scripts

| Command                  | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `pnpm dev`               | Start the Astro development server               |
| `pnpm build`             | Build the production site to `dist/`             |
| `pnpm check`             | Run Astro and TypeScript diagnostics             |
| `pnpm verify`            | Run environment, format, type, and build checks  |
| `pnpm verify:full`       | Run standard checks plus browser tests           |
| `pnpm env:check`         | Check local tools, ownership, and permissions    |
| `pnpm env:check:network` | Include npm registry connectivity                |
| `pnpm env:check:deploy`  | Include GitHub and Cloudflare authentication     |
| `pnpm test:e2e`          | Test every route in desktop and mobile Chromium  |
| `pnpm debug:site`        | Produce Playwright traces and screenshot reports |
| `pnpm test:e2e:headed`   | Run browser tests visibly                        |
| `pnpm preview`           | Preview the production build locally             |
| `pnpm astro`             | Run Astro CLI commands                           |

## Project structure

```txt
.
├── public/              # Public static files, including favicon and downloadable assets
├── src/
│   ├── components/      # Astro components for homepage sections and UI pieces
│   ├── fonts/           # Local font files loaded through Astro config
│   ├── graphics/        # SVGs and brand marks
│   ├── images/          # Project showcase imagery
│   └── pages/           # Astro routes
├── astro.config.mjs     # Astro configuration
├── package.json         # Scripts, dependencies, and Node engine
└── tsconfig.json        # TypeScript and path alias config
```

## Path aliases

The project uses `@/*` as an alias for `src/*`.

Example:

```astro
---
import Banner from "@/components/banner.astro";
---
```

## Deployment notes

The site builds static routes through `@astrojs/cloudflare` and deploys with Wrangler using `wrangler.jsonc`. Run `pnpm env:check:deploy` before deployment work to validate network access and credentials.

## Repository status

This is an active portfolio build. The README is intentionally practical rather than pretending this is still an untouched starter template, because we do occasionally evolve past boilerplate as a species.
