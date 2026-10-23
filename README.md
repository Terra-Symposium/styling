# Terra Styling

Public Apache 2.0 package for Terra hue palettes and reusable UI. The hue implementation is extracted from the Terra Symposium website. The UI component extraction is in progress; the first package build exports the hue functions and types.

## Build

```sh
pnpm install
pnpm build
pnpm docs:build
```

The hosted guide is built with `@terra-symposium/docs` and mounted by the portfolio site at `/styling-docs/`. Until the Docs package is on the public registry, this repository includes a reviewed package tarball under `vendor/` for a reproducible build.
