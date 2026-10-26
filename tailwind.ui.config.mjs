import preset from './dist/lib/tailwind-preset.js';
export default {
  presets: [preset],
  content: ['./src/components/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
};
