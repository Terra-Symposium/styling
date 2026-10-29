# Terra Styling

Public Apache 2.0 package for Terra hue palettes and reusable UI. The hue implementation and UI primitives are extracted from the Terra Symposium website.

The package exports reusable controls and surfaces, data-driven `MappedFormFields`, `FormSelect`, and `DataTable` components, and UI primitives including `Button`, `Select`, `ContextMenu`, `DropdownMenu`, `Tooltip`, `ToggleGroup`, `Input`, `Label`, `Separator`, `Spinner`, and the original Docs toolbar frame from `@terra-symposium/styling/ui`. Import `@terra-symposium/styling/ui.css` once to include their utility classes and default palette. Hosts can override the `--primary-*` and `--secondary-*` variables using the hue API. The original Tailwind preset is available as `@terra-symposium/styling/tailwind-preset` for hosts that compile additional components.

## Build

```sh
pnpm install
pnpm build
pnpm docs:build
```

The hosted guide is built with `@terra-symposium/docs` and mounted by the portfolio site at `/styling-docs/`. Until the Docs package is on the public registry, this repository includes a reviewed package tarball under `vendor/` for a reproducible build.

## Agent skills

UI design, styling, responsive review, and variant workflows live in [`.agents/skills/ui/`](.agents/skills/ui/SKILL.md).
