function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function shiftHex(hex: string, percent: number): string {
  const amt = Math.round((percent / 100) * 255);
  const [r, g, b] = hexToRgb(hex).map((c) =>
    Math.min(255, Math.max(0, c + amt)),
  ) as [number, number, number];
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates the WCAG contrast ratio between two hex colors.
 */
export function contrastRatio(hexA: string, hexB: string): number {
  const [l1, l2] = [relativeLuminance(hexA), relativeLuminance(hexB)].sort(
    (a, b) => b - a,
  ) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Adjusts a foreground color until it reaches the requested contrast
 * ratio against the background color.
 */
export function lockContrast(
  foreground: string,
  background: string,
  minRatio = 4.5,
): string {
  if (contrastRatio(foreground, background) >= minRatio) return foreground;

  const towardBlack =
    contrastRatio("#000000", background) >=
    contrastRatio("#ffffff", background);
  let candidate = foreground;
  for (
    let i = 0;
    i < 20 && contrastRatio(candidate, background) < minRatio;
    i++
  ) {
    candidate = shiftHex(candidate, towardBlack ? -10 : 10);
  }
  return candidate;
}
