export class CircularDependencyError extends Error {
  constructor(public readonly cycle: string[]) {
    super(`Circular token dependency: ${cycle.join(" -> ")} -> ${cycle[0]}`);
    this.name = "CircularDependencyError";
  }
}

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
