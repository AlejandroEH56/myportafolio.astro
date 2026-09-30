import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository?.split('/') ?? [];

const inferredSite = owner ? `https://${owner}.github.io` : 'https://example.com';
const inferredBase = owner && repo && repo !== `${owner}.github.io` ? `/${repo}` : '/';

export default defineConfig({
  site: process.env.SITE_URL ?? inferredSite,
  base: process.env.BASE_PATH ?? inferredBase,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()]
});
