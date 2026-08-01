import { afterEach, describe, expect, it } from "vitest";
import { render, cleanup } from "@testing-library/svelte";
import { flushSync } from "svelte";
import { Genome } from "@genomejs/core";
import TestComponent from "./_TestComponent.svelte";

describe("genomeTrait", () => {
  afterEach(() => cleanup());

  it("reads the current trait value on initial render", () => {
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

    const { getByTestId } = render(TestComponent, {
      props: { genome, name: "label" },
    });
    expect(getByTestId("value").textContent).toBe("Light");
  });

  it("updates when the genome mutates", () => {
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

    const { getByTestId } = render(TestComponent, {
      props: { genome, name: "label" },
    });
    expect(getByTestId("value").textContent).toBe("Light");

    genome.mutate({ mode: "dark" });
    flushSync();
    expect(getByTestId("value").textContent).toBe("Dark");
  });
});
