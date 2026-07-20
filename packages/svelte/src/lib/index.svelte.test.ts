import { flushSync } from "svelte";
import { describe, expect, it } from "vitest";
import { Genome } from "@genome/core";
import { genomeTrait } from "./index.svelte";

describe("genomeTrait", () => {
  it("reads the current trait value on initial render", () => {
    const cleanup = $effect.root(() => {
      const target = document.createElement("div");
      const genome = new Genome(
        {
          primitives: {},
          tokens: {
            label: (_dna, ctx) => (ctx.mode === "dark" ? "Dark" : "Light"),
          },
        },
        target,
      );
      genome.mutate({ mode: "light" });

      const label = genomeTrait(genome, "label");
      flushSync();

      expect(label.value).toBe("Light");
    });
    cleanup();
  });

  it("updates when the genome mutates", () => {
    const cleanup = $effect.root(() => {
      const target = document.createElement("div");
      const genome = new Genome(
        {
          primitives: {},
          tokens: {
            label: (_dna, ctx) => (ctx.mode === "dark" ? "Dark" : "Light"),
          },
        },
        target,
      );
      genome.mutate({ mode: "light" });

      const label = genomeTrait(genome, "label");
      flushSync();
      expect(label.value).toBe("Light");

      genome.mutate({ mode: "dark" });
      flushSync();
      expect(label.value).toBe("Dark");
    });
    cleanup();
  });
});
