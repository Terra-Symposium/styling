import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

export default defineConfig({
  site: 'https://kaimacann.netlify.app',
  base: '/styling-docs',
  outDir: '../site-dist',
  integrations: [react()],
  vite: {
    resolve: {
      alias: [
        { find: '@terra-symposium/styling/ui/terra-original', replacement: `${dist}ui/terra-original/index.js` },
        { find: '@terra-symposium/styling/ui.css', replacement: `${dist}ui.css` },
        { find: '@terra-symposium/styling/ui', replacement: `${dist}ui/index.js` },
        { find: '@terra-symposium/styling', replacement: `${dist}index.js` },
      ],
    },
  },
});
