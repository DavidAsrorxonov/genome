/* @vitest-environment node */

import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Genome } from "@genomejs/core";
import { useGenomeTrait } from "./index";

function TestComponent({ genome }: { genome: Genome }) {
  const value = useGenomeTrait(genome, "label");

  return <div data-testid="value">{value}</div>;
}

describe("useGenomeTrait server rendering", () => {
  it("renders the current trait without a browser DOM", () => {
    const genome = new Genome({
      primitives: {},
      tokens: {
        label: (_dna, context) => (context.mode === "dark" ? "Dark" : "Light"),
      },
    });

    genome.mutate({ mode: "light" });

    const html = renderToString(<TestComponent genome={genome} />);

    expect(html).toContain("Light");
  });
});
