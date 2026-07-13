/**
 * Produces a CSS clamp() expression that linearly interpolates a font size
 * between minPx and maxPx.
 */
export function fluidScale(
  minPx: number,
  maxPx: number,
  minVw = 320,
  maxVw = 1440,
): string {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const yIntercept = minPx - slope * minVw;

  return `clamp(${minPx}px, ${yIntercept.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw, ${maxPx}px)`;
}
