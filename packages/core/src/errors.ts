/**
 * Reports a dependency cycle found while resolving Genome tokens.
 *
 * @param cycle - The ordered token names that form the circular dependency.
 */
export class CircularDependencyError extends Error {
  constructor(public readonly cycle: string[]) {
    super(`Circular token dependency: ${cycle.join(" -> ")} -> ${cycle[0]}`);
    this.name = "CircularDependencyError";
  }
}

/**
 * Reports token references that could not be resolved from the theme.
 *
 * @param token - The token whose dependencies could not be resolved.
 * @param missing - The missing token names referenced by the token.
 */
export class UnresolvedTokenError extends Error {
  constructor(
    public readonly token: string,
    public readonly missing: string[],
  ) {
    super(
      `Token "${token}" references undefined token(s): ${missing.join(", ")}`,
    );
    this.name = "UnresolvedTokenError";
  }
}
