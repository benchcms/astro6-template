---
name: seo
description: Use when working on Search Engine Optimization (SEO) for the Astro 6 project. Covers injecting metadata, configuring sitemaps, generating robots.txt, implementing JSON-LD structured data, and adding Open Graph (OG) / Twitter Card tags. Always refer to this skill to ensure SEO consistency across the site.
license: MIT
metadata:
  author: project-owner
  version: '1.0.0'
---

# Astro 6 SEO Skill

This document provides the standard operating procedures, patterns, and checklists for implementing technical SEO in this Astro 6 codebase.

## Quick Reference: Astro SEO Headers

In Astro, SEO metadata is typically passed via `Astro.props` into a shared Layout or a dedicated `<SEO />` component.

```astro
---
// src/layouts/Layout.astro (or components/SEO.astro)
interface Props {
  title: string
  description: string
  image?: string
  canonicalURL?: string
}

const {
  title,
  description,
  image = '/default-og.png',
  canonicalURL = new URL(Astro.url.pathname, Astro.site).toString(),
} = Astro.props
---

<!-- Essential Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.site)} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image, Astro.site)} />
```

**Key gotcha:** Always use `Astro.site` when resolving absolute URLs for canonical links and social images. Ensure the `site` property is configured in `astro.config.mjs`.

## Setting Up Sitemaps

Astro 6 relies on the `@astrojs/sitemap` integration for dynamic sitemap generation. This template already has it installed and pre-configured.

### Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'http://localhost:4321', // AGENT INSTRUCTION: Always remind the developer to update this to their production URL
  integrations: [sitemap()],
})
```

## Implementing JSON-LD (Structured Data)

Use `<script type="application/ld+json">` tightly coupled to the component or layout representing the data.

```astro
---
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Your Project Name',
  url: Astro.site,
}
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

**Key gotcha:** You must use `set:html` to safely inject the JSON string into the `<script>` tag in Astro.

## Technical Requirements & Checklists

When applying SEO to a page, audit against the following lists:

### Page-Level Checklist

- [ ] **Title tag** is dynamic and optimally 50-60 characters.
- [ ] **Meta description** accurately summarizes the page content (150-160 characters).
- [ ] **Canonical URL** strictly uses an absolute URL (leveraging `Astro.site`).
- [ ] **Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:url`) are fully populated.
- [ ] **Twitter Card tags** are fully populated.

### Site-Wide Checklist

- [ ] `public/robots.txt` exists and clearly points to `Sitemap: https://your-site.com/sitemap-index.xml`.
- [ ] `site` is defined in `astro.config.mjs`.
- [ ] Basic Organization and WebSite JSON-LD structured data are implemented on the homepage or globally.
- [ ] A default `og-image.jpg` or `.png` exists in `public/` (1200x630 resolution, under 300KB).

## Common Mistakes

| #   | Mistake                                   | Fix                                                                                                                               |
| --- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Relative URLs in OG/Twitter Images**    | Social platforms cannot read relative paths for images. Always use `new URL(imagePath, Astro.site)` to generate an absolute path. |
| 2   | **Hardcoding the production URL**         | Avoid hardcoding `https://mywebsite.com`. Always use `Astro.site` to maintain consistency across staging and production builds.   |
| 3   | **Forgetting to define `site` in config** | Without defining `site:` in `astro.config.mjs`, references to `Astro.site` will be undefined, breaking canonicals and sitemaps.   |
| 4   | **Malformed JSON-LD output**              | Astro escapes strings normally. Always use `set:html={JSON.stringify(data)}` on the JSON-LD script tag.                           |

## Verification Commands

After applying SEO modifications, run the following to verify your work:

| Command               | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| `npm run astro check` | Verify Astro types and syntax                     |
| `npm run format`      | Format all files                                  |
| `npm run build`       | Ensure the payload and sitemaps compile perfectly |
