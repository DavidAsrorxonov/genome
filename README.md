# GenomeJS

A reactive design token system — dependency-graph resolver, contrast locking, fluid typography, and framework bindings for React, Vue, and Svelte.

## Packages

| Package                                 | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| [`@genomejs/core`](./packages/core)     | The core reactive engine — framework-agnostic |
| [`@genomejs/react`](./packages/react)   | React bindings (`useGenomeTrait`)             |
| [`@genomejs/vue`](./packages/vue)       | Vue bindings (`useGenomeTrait`)               |
| [`@genomejs/svelte`](./packages/svelte) | Svelte 5 (runes) bindings (`genomeTrait`)     |

See each package's own README for usage examples.

## Development

```bash
npm install
npx tsc -b --pretty
npm run build --workspaces --if-present
npx vitest run
```

## License

MIT
