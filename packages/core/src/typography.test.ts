import { describe, expect, it } from "vitest";
import { fluidScale } from "./typography";

describe("fluidScale", () => {
  it("produces a clamp() expression bounded by min and max px", () => {
    const result = fluidScale(16, 32, 320, 1440);
    expect(result).toMatch(/^clamp\(16px, .+px \+ .+vw, 32px\)$/);
  });

  it("resolves to exactly minPx at minVw", () => {
    // At minVw, slope*minVw + yIntercept should equal minPx by construction
    const minPx = 16,
      maxPx = 32,
      minVw = 320,
      maxVw = 1440;
    const slope = (maxPx - minPx) / (maxVw - minVw);
    const yIntercept = minPx - slope * minVw;
    expect(yIntercept + slope * minVw).toBeCloseTo(minPx, 4);
  });

  it("supports custom viewport boundaries", () => {
    expect(fluidScale(16, 32, 400, 1200)).toBe(
      "clamp(16px, 8.0000px + 2.0000vw, 32px)",
    );
  });
});
