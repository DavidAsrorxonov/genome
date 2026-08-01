# @genomejs/vue

Vue bindings for [@genomejs/core](https://www.npmjs.com/package/@genomejs/core).

## Install

```bash
npm install @genomejs/core @genomejs/vue
```

## Usage

```vue
<script setup>
import { Genome } from "@genomejs/core";
import { useGenomeTrait } from "@genomejs/vue";

const genome = new Genome({
  primitives: { color: "#3366ff" },
  tokens: {},
});

const color = useGenomeTrait(genome, "color");
</script>

<template>
  <h1 :style="{ color }">Hello, Genome</h1>
</template>
```

`useGenomeTrait` returns a reactive `Ref` that updates whenever the genome mutates.

## License

MIT
