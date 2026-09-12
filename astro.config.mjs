import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Optional public origin (see README.md and .env.example). Unset by default: the local production build
// then carries no canonical URL, og:url, absolute share-image URL, or sitemap, rather than a localhost or
// invented domain. When set it must be a bare https origin such as https://example.com.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = publicOrigin(SITE_URL);

function publicOrigin(value) {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;
  const fail = (why) => {
    throw new Error(
      `SITE_URL "${raw}" is not a valid public origin: ${why}. Expected the form https://example.com with no path, query, fragment, or credentials. Leave SITE_URL empty for a local build.`,
    );
  };
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail('it is not a valid URL');
  }
  if (url.protocol !== 'https:') fail('the origin must use https://');
  if (url.username || url.password) fail('credentials are not allowed');
  if (url.search || raw.includes('?')) fail('a query string is not allowed');
  if (url.hash || raw.includes('#')) fail('a fragment is not allowed');
  if (url.pathname !== '/') fail('a subpath is not allowed');
  const host = url.hostname;
  if (host === 'localhost' || host.endsWith('.localhost') || !host.includes('.') || /^[\d.]+$/.test(host) || host.startsWith('[')) {
    fail('the host must be a public domain name');
  }
  return url.origin + '/';
}

// Writes robots.txt on every build and, only when a public origin is configured, a sitemap.xml listing the
// built HTML routes. Astro empties dist/ before each build, and the hook also removes any stale sitemap, so a
// later local build cannot keep a sitemap from an earlier test origin.
function sitemapAndRobots() {
  return {
    name: 'portfolio:sitemap-robots',
    hooks: {
      'astro:build:done': ({ dir, pages, logger }) => {
        const out = fileURLToPath(dir);
        const sitemapPath = path.join(out, 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) fs.rmSync(sitemapPath);
        const robots = ['User-agent: *', 'Allow: /'];
        if (site) {
          const routes = pages
            .map((p) => p.pathname.replace(/^\/+/, ''))
            .map((p) => (p === '' || p.endsWith('/') ? p : p + '/'))
            .sort();
          const escape = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const xml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...routes.map((r) => '  <url><loc>' + escape(site + r) + '</loc></url>'),
            '</urlset>',
            '',
          ].join('\n');
          fs.writeFileSync(sitemapPath, xml);
          robots.push('', 'Sitemap: ' + site + 'sitemap.xml');
          logger.info('sitemap.xml lists ' + routes.length + ' routes for ' + site);
        } else {
          logger.info('SITE_URL is not set: no canonical URLs, og:url, or sitemap in this local build');
        }
        fs.writeFileSync(path.join(out, 'robots.txt'), robots.join('\n') + '\n');
      },
    },
  };
}

// Serve generated static pages. Restrict development file access to the site and block local metadata.
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  server: { host: '127.0.0.1', port: 4321 },
  devToolbar: { enabled: false },
  integrations: [sitemapAndRobots()],
  vite: {
    server: {
      fs: {
        strict: true,
        deny: ['**/.env', '**/.env.*', '**/.git/**', '**/.wrangler/**', '**/*.{crt,pem}', '**/*.md', '**/*.csv', '**/*.txt'],
      },
    },
  },
});
