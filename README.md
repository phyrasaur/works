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
pnpm
```

## Getting started

Install dependencies:

```sh
pnpm install
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

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Astro development server |
| `pnpm build` | Build the production site to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro` | Run Astro CLI commands |

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

This project currently uses Astro's default static build output. Unless an adapter is added later, deployment can target any static host that can serve the generated `dist/` folder.

Good fits include:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages
- Any static web server

## Repository status

This is an active portfolio build. The README is intentionally practical rather than pretending this is still an untouched starter template, because we do occasionally evolve past boilerplate as a species.
