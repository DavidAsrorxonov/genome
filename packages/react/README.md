# @genomejs/react

React bindings for [@genomejs/core](https://www.npmjs.com/package/@genomejs/core).

## Install

```bash
npm install @genomejs/core @genomejs/react
```

## Usage

```jsx
import { Genome } from "@genomejs/core";
import { useGenomeTrait } from "@genomejs/react";

const genome = new Genome({
  primitives: { color: "#3366ff" },
  tokens: {},
});

function App() {
  const color = useGenomeTrait(genome, "color");
  return <h1 style={{ color }}>Hello, Genome</h1>;
}
```

`useGenomeTrait` re-renders your component whenever the genome mutates.

## License

MIT
