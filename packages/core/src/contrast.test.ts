import { describe, expect, it } from "vitest";
import { contrastRatio, lockContrast } from "./contrast";

describe("contrast locking", () => {
  it("leaves already-compliant colors untouched", () => {
    expect(lockContrast("#000000", "#ffffff")).toBe("#000000");
  });

  it("adjusts a non-compliant foreground until it clears the ratio", () => {
    const adjusted = lockContrast("#777777", "#888888", 4.5);
    expect(contrastRatio(adjusted, "#888888")).toBeGreaterThanOrEqual(4.5);
  });
});
