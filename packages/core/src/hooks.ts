import type { Genome } from "./genome";

/**
 * Keeps Genome's runtime context synchronized with the user's
 * system color-scheme and reduced-motion preferences.
 *
 * @param genome - The Genome instance to receive media preference changes.
 * @returns A cleanup function that removes the media query listeners.
 */
export function bindMediaQueries(genome: Genome): () => void {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion)");

  const sync = () => {
    genome.mutate({
      colorScheme: darkModeQuery.matches ? "dark" : "light",
      reducedMotion: reducedMotionQuery.matches,
    });
  };

  sync();

  darkModeQuery.addEventListener("change", sync);
  reducedMotionQuery.addEventListener("change", sync);

  return () => {
    darkModeQuery.removeEventListener("change", sync);
    reducedMotionQuery.removeEventListener("change", sync);
  };
}

/**
 * Keeps Genome's runtime context synchronized with the width
 * of a particular HTML element.
 *
 * @param genome - The Genome instance to receive container width changes.
 * @param element - The HTML element whose content width should be observed.
 * @returns A cleanup function that disconnects the resize observer.
 */
export function bindContainerSize(
  genome: Genome,
  element: HTMLElement,
): () => void {
  const observer = new ResizeObserver(([entry]) => {
    if (!entry) return;

    genome.mutate({
      containerWidth: entry.contentRect.width,
    });
  });

  observer.observe(element);

  // cleanup the mess on unmount.
  return () => observer.disconnect();
}
