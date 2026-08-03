# Contributing to GenomeJS

Thanks for contributing to GenomeJS.

GenomeJS is a TypeScript monorepo containing a framework-neutral reactive design-token compiler and adapters for React, Vue, and Svelte.

## Repository structure

```text
genome/
├── packages/
│   ├── core/
│   ├── react/
│   ├── vue/
│   └── svelte/
├── .github/workflows/
├── package.json
├── tsconfig.json
├── tsconfig.base.json
├── vitest.config.ts
└── vitest.setup.ts
```

## Prerequisites

Use:

- Node.js 20
- npm
- Git

Node 20 matches the version used by the GitHub Actions workflow.

## Local setup

Clone the repository:

```bash
git clone https://github.com/DavidAsrorxonov/genome.git
cd genome
```

Install dependencies:

```bash
npm install
```

For a clean lockfile-based installation, use:

```bash
npm ci
```

## Verification

Run the same major checks used by CI.

### Type check

```bash
npx tsc -b --pretty
```

The root TypeScript project references all four package projects.

### Build

```bash
npm run build --workspaces --if-present
```

### Test

```bash
npx vitest run
```

### Full local verification

```bash
npm ci
npx tsc -b --pretty
npm run build --workspaces --if-present
npx vitest run
```

## Package responsibilities

### `@genomejs/core`

Contains:

- The `Genome` class
- Dependency discovery
- Graph validation and ordering
- Runtime context mutation
- CSS custom-property expression
- Error classes
- Contrast utilities
- Fluid scaling
- Browser environment bindings

Core must remain framework-neutral.

### `@genomejs/react`

Contains the React `useGenomeTrait()` hook.

React-specific behavior must remain inside this package.

### `@genomejs/vue`

Contains the Vue `useGenomeTrait()` composable.

Vue-specific lifecycle and reactive behavior must remain inside this package.

### `@genomejs/svelte`

Contains the Svelte 5 rune-aware `genomeTrait()` helper.

This package is built with Svelte's package tooling and ships Svelte-aware output.

## Development guidelines

### Keep public behavior documented

When changing a public API:

1. Add or update tests.
2. Update JSDoc comments.
3. Update the relevant package README.
4. Update the public website documentation.
5. Add an entry under `Unreleased` in `CHANGELOG.md`.

### Keep token functions predictable

Token functions may run:

- During dependency tracking
- During initial resolution
- After runtime context mutations
- During scoped Genome construction

Token functions should be pure and free of side effects.

### Keep Core framework-neutral

Do not import React, Vue, or Svelte from `@genomejs/core`.

Framework adapters may depend on Core. Core must not depend on framework adapters.

### Clean up browser listeners

Functions that register:

- Media-query listeners
- Resize observers
- Framework subscriptions
- Other browser listeners

must provide and test cleanup behavior.

### Preserve server safety

Core must not assume that `window` or `document` exists.

Browser-only behavior should be isolated behind explicit APIs or framework mounting lifecycles.

### Avoid unsupported claims

Documentation and marketing should not claim performance, browser coverage, or compatibility that has not been tested.

## Tests

Tests live beside source files:

```text
packages/*/src/**/*.test.ts
packages/*/src/**/*.test.tsx
```

Use jsdom for DOM and framework integration behavior.

Important areas include:

- Dependency order
- Circular dependency paths
- Missing token references
- Runtime mutation
- CSS write deduplication
- Scope isolation
- Framework rerendering
- Subscription cleanup
- Server rendering
- Browser binding cleanup

Every bug fix should include a regression test when practical.

## Branches

Create a focused branch:

```bash
git switch -c fix/descriptive-name
```

Examples:

```text
feat/core-context-schema
fix/react-subscription
docs/contrast-reference
test/svelte-cleanup
chore/release-0.1.3
```

## Commits

Use clear, focused commit messages.

Examples:

```text
feat(core): add token snapshot API
fix(react): stabilize external-store subscription
docs: clarify browser-only bindings
test(vue): cover subscription cleanup
chore: release GenomeJS 0.1.3
```

Avoid combining unrelated changes in one commit.

## Pull requests

A pull request should explain:

- What changed
- Why it changed
- Which package or packages are affected
- Whether the public API changed
- Which tests were added or updated
- Whether documentation was updated
- Any browser, server-rendering, or framework implications

Before opening a pull request, run:

```bash
npx tsc -b --pretty
npm run build --workspaces --if-present
npx vitest run
```

## Reporting bugs

Open an issue with:

- The affected package and version
- Runtime and framework versions
- Browser or Node version
- A minimal reproduction
- Expected behavior
- Actual behavior
- Error messages or stack traces

Do not include credentials, access tokens, or private application data.

## Feature requests

Describe:

- The problem being solved
- Why the existing API is insufficient
- The proposed public behavior
- Framework implications
- Server-rendering implications
- Backward-compatibility concerns

## Releases

Releases are handled by project maintainers.

A release should include:

1. Completed verification
2. Updated package versions
3. Updated package lockfile
4. Updated `CHANGELOG.md`
5. Updated documentation
6. Published packages
7. A clearly identified release commit or tag

Do not publish packages from an unverified working tree.

## License

By contributing to GenomeJS, you agree that your contributions will be licensed under the repository's MIT License.
