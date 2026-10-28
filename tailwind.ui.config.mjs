import preset from './dist/lib/tailwind-preset.js';
export default {
  presets: [preset],
  // Styling ships the original UI primitive cascade. Docs compiles its own
  // utilities into the single @terra-symposium/docs/style.css entrypoint.
  content: ['./src/components/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
};
