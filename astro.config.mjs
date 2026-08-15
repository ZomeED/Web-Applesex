import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://applesex-ecommerce.pages.dev', // Dominio de producción
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [sitemap()],
});
