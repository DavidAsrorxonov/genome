# @genomejs/core

Reactive design token compiler — dependency-graph resolver, contrast locking, fluid typography, and browser environment hooks.

## Install

```bash
npm install @genomejs/core
```

## Usage

```js
import { Genome } from '@genomejs/core';

const genome = new Genome({
primitives: {
baseSize: 16,
},
tokens: {
scaledSize: (dna, ctx) => dna.baseSize \* (ctx.scale ?? 1),
},
});

genome.mutate({ scale: 1.5 });

console.log(genome.getTrait('scaledSize')); // 24

genome.subscribe(() => {
console.log('updated:', genome.getTrait('scaledSize'));
});
```

Traits are also expressed as CSS custom properties (e.g. `--g-scaled-size`) on the target element, which defaults to `document.documentElement`.

## Framework bindings

- [@genomejs/react](https://www.npmjs.com/package/@genomejs/react)
- [@genomejs/vue](https://www.npmjs.com/package/@genomejs/vue)
- [@genomejs/svelte](https://www.npmjs.com/package/@genomejs/svelte)

## License

MIT
