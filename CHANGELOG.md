# Changelog

All notable changes to GenomeJS are documented in this file.

The project follows semantic versioning while its public APIs continue to develop. Versions below `1.0.0` may contain breaking changes.

## Unreleased

### Added

- Root contribution guidelines.
- A standalone MIT license file.
- A formal project changelog.
- Expanded public website documentation for Core, framework adapters, utilities, guides, and reference material.

## 0.1.2 — 2026-08-02

### Added

- Server-rendering coverage for the React `useGenomeTrait()` hook.
- A server snapshot for React's `useSyncExternalStore()` integration.
- React 19 development and test coverage.

### Changed

- Updated the React development environment and TypeScript definitions.
- Made Core's default CSS target safe outside browser environments.
- Allowed the `Genome` constructor to operate with an `HTMLElement` or `null`.
- Prevented CSS expression when a Genome has no DOM target.
- Updated `@genomejs/core` from `0.1.1` to `0.1.2`.
- Updated `@genomejs/react` from `0.1.1` to `0.1.2`.

### Compatibility

- `@genomejs/react` supports React 18 and newer.
- Core value resolution can run during server rendering without accessing `document`.

## 0.1.1 — 2026-08-01

### Added

- Root repository README.
- Package-specific READMEs for:
  - `@genomejs/core`
  - `@genomejs/react`
  - `@genomejs/vue`
  - `@genomejs/svelte`
- Installation and basic usage examples for every package.
- Package repository, homepage, and issue metadata.

### Changed

- Renamed the package scope from `@genome/*` to `@genomejs/*`.
- Updated all four public package versions from `0.1.0` to `0.1.1`.
- Improved package build cleanup so test declaration artifacts are not published.
- Expanded public JSDoc coverage across Core and framework adapters.

## Earlier development

The initial `0.1.0` package line was created before formal changelog tracking began.

That development introduced:

- The Core `Genome` compiler and runtime.
- Automatic dependency discovery through DNA property reads.
- Topological token resolution.
- Circular dependency reporting.
- Unresolved-token reporting.
- Runtime context mutation.
- CSS custom-property expression.
- Scoped Genome instances.
- `contrastRatio()`.
- `lockContrast()`.
- `fluidScale()`.
- `bindMediaQueries()`.
- `bindContainerSize()`.
- React `useGenomeTrait()`.
- Vue `useGenomeTrait()`.
- Svelte 5 `genomeTrait()`.
- TypeScript project references.
- Workspace builds.
- Vitest coverage.
- GitHub Actions CI.
