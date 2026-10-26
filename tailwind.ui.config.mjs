import preset from './dist/lib/tailwind-preset.js';
export default {
  presets: [preset],
  // The UI bundle is the one utility layer used by every Docs workspace. Scan
  // its compiled source here so Docs consumers do not load a second Tailwind
  // utility bundle that can change the original shadcn responsive cascade.
  content: [
    './src/components/**/*.{ts,tsx}',
    './node_modules/@terra-symposium/docs/lib-dist/**/*.{js,mjs}',
  ],
  corePlugins: { preflight: false },
};
