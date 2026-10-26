Styling exports `colors`, `invert`, `flattenColors`, `applyHue`, and `isDarkMode` from the Terra hue implementation.

```ts
import { colors, applyHue } from '@terra-symposium/styling';

const [accent, gray] = colors(220);
applyHue(220);
```

`colors(hue)` returns twelve light and dark shades. Passing `null` creates a grayscale palette. `applyHue` writes theme variables to the document and announces `docs:hue-change` to live consumers.
