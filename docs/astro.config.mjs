import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kaimacann.netlify.app',
  base: '/styling-docs',
  outDir: '../site-dist',
  integrations: [react()],
});
