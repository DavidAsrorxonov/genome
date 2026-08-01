import { describe, expect, it } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Genome } from "@genomejs/core";
import { useGenomeTrait } from "./index";

function TestComponent({ genome }: { genome: Genome }) {
  const value = useGenomeTrait(genome, "label");
  return <div data-testid="value">{value}</div>;
}

describe("useGenomeTrait", () => {
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

    render(<TestComponent genome={genome} />);
    expect(screen.getByTestId("value").textContent).toBe("Light");
  });

  it("re-renders when the genome mutates", () => {
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

    render(<TestComponent genome={genome} />);
    expect(screen.getByTestId("value").textContent).toBe("Light");

    act(() => {
      genome.mutate({ mode: "dark" });
    });

    expect(screen.getByTestId("value").textContent).toBe("Dark");
  });
});
