import { CircularDependencyError, UnresolvedTokenError } from "./errors";
import type {
  DNAReader,
  GenomeConfig,
  Primitive,
  RuntimeContext,
  TokenFn,
} from "./types";

interface CompiledGraph {
  order: string[];
  dependencies: Map<string, Set<string>>;
}

export class Genome {
  private primitives: Record<string, Primitive>;
  private tokenDefs: Record<string, TokenFn | Primitive>;
  private compiled: CompiledGraph;
  private dna: Record<string, Primitive> = {};
  private context: RuntimeContext = {};
  private target: HTMLElement;
  private lastExpressed = new Map<string, string>();
  private subscribers = new Set<() => void>();

  constructor(
    config: GenomeConfig,
    target: HTMLElement = document.documentElement,
  ) {
    this.primitives = { ...config.primitives };
    this.tokenDefs = { ...config.tokens };
    this.target = target;
    this.compiled = this.compile();
    this.resolve();
  }

  private compile(): CompiledGraph {
    const derivedKeys = Object.keys(this.tokenDefs).filter(
      (k) => typeof this.tokenDefs[k] === "function",
    );

    const dependencies = new Map<string, Set<string>>();

    for (const key of derivedKeys) {
      const touched = new Set<string>();
      const recorder = new Proxy({} as DNAReader, {
        get: (_t, prop: string) => {
          touched.add(prop);
          return 0; // inert placeholder — value is discarded in this pass
        },
      });
      const inertContext = new Proxy({} as RuntimeContext, {
        get: () => undefined,
      });
      const fn = this.tokenDefs[key] as TokenFn;
      try {
        fn(recorder, inertContext);
      } catch {
        // A tracking-pass exception unrelated to missing keys doesn't matter —
        // we only need to know which keys were touched before the throw.
      }
      dependencies.set(key, touched);
    }

    // (validation + sort continue below)
    const known = new Set([...Object.keys(this.primitives), ...derivedKeys]);
    for (const [key, deps] of dependencies) {
      const missing = [...deps].filter((d) => !known.has(d));
      if (missing.length > 0) {
        throw new UnresolvedTokenError(key, missing);
      }
    }

    // Kahn's algorithm
    const inDegree = new Map<string, number>(derivedKeys.map((k) => [k, 0]));
    for (const key of derivedKeys) {
      for (const dep of dependencies.get(key)!) {
        if (inDegree.has(dep)) {
          inDegree.set(key, (inDegree.get(key) ?? 0) + 1);
        }
      }
    }

    const queue = derivedKeys.filter((k) => inDegree.get(k) === 0);
    const order: string[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      order.push(node);
      for (const key of derivedKeys) {
        if (dependencies.get(key)!.has(node)) {
          const remaining = (inDegree.get(key) ?? 0) - 1;
          inDegree.set(key, remaining);
          if (remaining === 0) queue.push(key);
        }
      }
    }

    if (order.length !== derivedKeys.length) {
      const stuck = derivedKeys.filter((k) => !order.includes(k));
      throw new CircularDependencyError(this.traceCycle(stuck, dependencies));
    }

    return {
      order,
      dependencies,
    };
  }

  private traceCycle(
    stuck: string[],
    deps: Map<string, Set<string>>,
  ): string[] {
    const stuckSet = new Set(stuck);
    const visited = new Set<string>();
    const stack: string[] = [];

    const dfs = (node: string): string[] | null => {
      const stackIndex = stack.indexOf(node);
      if (stackIndex !== -1) return stack.slice(stackIndex);
      if (visited.has(node)) return null;
      visited.add(node);
      stack.push(node);

      for (const dep of deps.get(node) ?? []) {
        if (stuckSet.has(dep)) {
          const found = dfs(dep);
          if (found) return found;
        }
      }

      stack.pop();
      return null;
    };

    for (const node of stack) {
      const cycle = dfs(node);
      if (cycle) return cycle;
    }

    return stuck;
  }
}
