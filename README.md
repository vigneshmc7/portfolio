# Vignesh MC

Personal portfolio built with Astro. The site generates static HTML, CSS, JavaScript and optimized images; it needs no application server or database.

## Local development

Use the Node version in `.nvmrc` and npm:

```sh
nvm install
nvm use
npm ci
npm run dev
```

The local site runs at `http://127.0.0.1:4321/`. To check a production build:

```sh
npm run build
npm run preview
```

To test Cloudflare's static asset routing locally after building, run `npm run preview:worker` and open `http://127.0.0.1:8787/`.

## Repository contents

- `src/`: pages, components, styles, public project content and imported images.
- `public/`: the favicon, share image, brand icons and font files used by the site.
- `licenses/`: font licenses and brand asset sources.
- Root configuration, dependency lockfile and this README.

The root `.gitignore` allows only these publication files. Dependencies, build output, local settings and development artifacts are excluded.

## Cloudflare Workers

Import this repository into Cloudflare Workers with these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Node version | Read from `.nvmrc` |
| Build variable | `SITE_URL=https://your-public-origin` when the final origin is known |

Wrangler is pinned in `package.json`. `wrangler.jsonc` names the Worker `vignesh-portfolio` and serves `dist/`. Directory routes redirect to a trailing slash; unknown paths return 404.

`SITE_URL` is a build-time value, not a runtime secret. Use a bare HTTPS origin without a path, query or fragment. For local builds, leave it unset or copy `.env.example` to an ignored `.env` file. Without a public origin, the build omits canonical URLs, absolute social image URLs and the sitemap. Once the final public address is known, set `SITE_URL` in Cloudflare's build variables and rebuild.

A custom domain can be attached after deployment; no domain is configured in this repository. Verify all pages, slashless redirects, missing-page responses, assets and canonical URLs on the deployed address before sharing it.

Cloudflare documentation: [Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/), [build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).
