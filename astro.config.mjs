// @ts-check
import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: Replace with your production URL for SEO (sitemaps, canonicals) to work correctly!
  site: 'http://localhost:4321',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
})
