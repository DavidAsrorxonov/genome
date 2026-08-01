# @genomejs/svelte

Svelte 5 bindings for [@genomejs/core](https://www.npmjs.com/package/@genomejs/core), built on runes.

## Install

```bash
npm install @genomejs/core @genomejs/svelte
```

## Usage

```svelte

<script lang="ts">
  import { Genome } from '@genomejs/core';
  import { genomeTrait } from '@genomejs/svelte';

  const genome = new Genome({
    primitives: { color: '#3366ff' },
    tokens: {},
  });

  const color = genomeTrait(genome, 'color');
</script>

<h1 style="color: {color.value}">Hello, Genome</h1>
```

`genomeTrait` returns a reactive object; read the current value via `.value`. It updates automatically whenever the genome mutates, and cleans up its subscription when the component unmounts.

## Requires

Svelte `>=5` with a Svelte-aware bundler (e.g. Vite + `@sveltejs/vite-plugin-svelte`), since this package ships uncompiled rune syntax that your bundler compiles at build time.

## License

MIT
