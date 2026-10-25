Install the versioned Styling package in a React application. The package is currently being prepared for public registry publication.

```sh
pnpm add @terra-symposium/styling
```

Import hue helpers from the package root and UI primitives from the shared UI entry point:

```tsx
import { applyHue } from '@terra-symposium/styling';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@terra-symposium/styling/ui';
import '@terra-symposium/styling/ui.css';
```
