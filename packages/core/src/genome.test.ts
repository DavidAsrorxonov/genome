import { CircularDependencyError, UnresolvedTokenError } from "./errors";
import { describe, expect, it } from "vitest";
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
});
