import { CircularDependencyError, UnresolvedTokenError } from "./errors";
import { describe, expect, it, vi } from "vitest";
import { Genome } from "./genome";

describe("Genome resolution", () => {
  it("resolves primitives and derived tokens in dependency order", () => {
    const target = document.createElement("div");
    const g = new Genome(
      {
        primitives: { base: 10 },
        tokens: {
          double: (dna) => Number(dna.base) * 2,
          quadruple: (dna) => Number(dna.double) * 2,
        },
      },
      target,
    );
    expect(g.getTrait("quadruple")).toBe(40);
  });

  it("reports the exact cycle path on circular dependencies", () => {
    const target = document.createElement("div");
    expect(() => {
      new Genome(
        {
          primitives: {},
          tokens: {
            a: (dna) => Number(dna.b) + 1,
            b: (dna) => Number(dna.c) + 1,
            c: (dna) => Number(dna.a) + 1,
          },
        },
        target,
      );
    }).toThrowError(CircularDependencyError);
  });

  it("distinguishes a missing reference from a cycle", () => {
    const target = document.createElement("div");
    expect(() => {
      new Genome(
        { primitives: {}, tokens: { a: (dna) => Number(dna.doesNotExist) } },
        target,
      );
    }).toThrowError(UnresolvedTokenError);
  });

  it("only rewrites CSS custom properties whose value actually changed", () => {
    const target = document.createElement("div");
    const setSpy = vi.spyOn(target.style, "setProperty");
    const g = new Genome(
      {
        primitives: { a: 1 },
        tokens: { b: (dna, ctx) => Number(dna.a) + (Number(ctx.n) || 0) },
      },
      target,
    );
    setSpy.mockClear();
    g.mutate({ n: 0 }); // b stays the same value
    expect(setSpy).not.toHaveBeenCalledWith("--g-b", expect.anything());
    g.mutate({ n: 1 }); // b actually changes
    expect(setSpy).toHaveBeenCalledWith("--g-b", "2");
  });

  it("isolates scoped context from the parent instance", () => {
    const parentEl = document.createElement("div");
    const childEl = document.createElement("div");
    const parent = new Genome(
      {
        primitives: {},
        tokens: {
          surface: (_dna, ctx) => (ctx.mode === "dark" ? "#000" : "#fff"),
        },
      },
      parentEl,
    );
    parent.mutate({ mode: "light" });
    const child = parent.scope(childEl, { mode: "dark" });

    expect(parent.getTrait("surface")).toBe("#fff");
    expect(child.getTrait("surface")).toBe("#000");
  });
});
