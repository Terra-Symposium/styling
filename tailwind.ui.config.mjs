import preset from './dist/tailwind-preset.js';
export default {
  presets: [preset],
  content: ['./src/ui/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
};
