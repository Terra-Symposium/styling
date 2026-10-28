import preset from './dist/lib/tailwind-preset.js';

export default {
  presets: [preset],
  content: [],
  // The Docs surface consumes Typography's canonical `.prose` styles from
  // this prebuilt stylesheet, before its own authored prose overrides load.
  safelist: ['prose'],
  corePlugins: { preflight: true },
};
