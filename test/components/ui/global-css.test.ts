import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import postcss from 'postcss';

const repo = process.cwd();
const source = (path: string): string => readFileSync(join(repo, path), 'utf8');

test('shared CSS keeps the original Docs base, component, and utility layers in order', () => {
  const stylesheet = source('src/styles/ui.css');
  const baseStylesheet = source('src/styles/ui-base.css');
  const base = baseStylesheet.indexOf('@tailwind base;');
  const components = baseStylesheet.indexOf('@tailwind components;');
  const utilities = stylesheet.indexOf('@tailwind utilities;');

  assert.ok(stylesheet.startsWith("@import './ui-base.css';\n@import './effects.css';"));
  assert.ok(baseStylesheet.startsWith("@import './tokens.css';"));
  assert.ok(base >= 0 && base < components && utilities > 0);
  assert.equal(baseStylesheet.includes('@tailwind utilities;'), false);
  assert.match(baseStylesheet, /font-family:\s*'Authentic Sans'/);
  assert.match(baseStylesheet, /font-family:\s*'Avara'/);
  assert.match(baseStylesheet, /svg\[style\*='--icon-baseline'\]/);
  assert.match(baseStylesheet, /\[contenteditable\][\s\S]*?:focus-visible/);
  assert.match(baseStylesheet, /@keyframes docs-toolbar-sweep/);
  assert.match(source('package.json'), /"\.\/ui-base\.css":\s*"\.\/dist\/ui-base\.css"/);
  assert.match(source('package.json'), /"\.\/effects\.css":\s*"\.\/dist\/effects\.css"/);
});

test('Docs-only preflight is exported separately so Docs consumers can restore the original reset', () => {
  const docsBase = source('src/styles/docs-base.css');
  assert.ok(docsBase.startsWith('@tailwind base;'));
  assert.ok(docsBase.indexOf('@tailwind base;') < docsBase.indexOf('@tailwind components;'));
  assert.equal(docsBase.includes('@tailwind utilities;'), false);
  assert.match(docsBase, /Shared document typography is part of Styling's public base cascade/);
  assert.match(docsBase, /body\s*\{\s*-webkit-font-smoothing:\s*antialiased;/);
  assert.match(source('tailwind.docs-base.config.mjs'), /preflight:\s*true/);
  assert.match(source('package.json'), /"\.\/docs-base\.css":\s*"\.\/dist\/docs-base\.css"/);
});

test('published CSS artifacts have no unresolved imports or nested selectors', () => {
  for (const file of ['dist/ui.css', 'dist/ui-base.css', 'dist/docs-base.css', 'dist/effects.css']) {
    const css = source(file);
    assert.doesNotMatch(css, /@import\s|@tailwind\s/, `${file} must be browser-ready`);
    const nestedSelectors: string[] = [];
    postcss.parse(css, { from: file }).walkRules((rule) => {
      if (/(^|[^\\])&/.test(rule.selector)) nestedSelectors.push(rule.selector);
    });
    assert.deepEqual(nestedSelectors, [], `${file} must not leak CSS nesting syntax`);
  }
  assert.match(source('dist/docs-base.css'), /-webkit-font-smoothing:\s*antialiased/);
});
