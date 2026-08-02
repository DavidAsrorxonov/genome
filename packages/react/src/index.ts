"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Genome, Primitive } from "@genomejs/core";

/**
 * Subscribes a React component to a resolved Genome token value.
 *
 * @param genome - The Genome instance to subscribe to.
 * @param name - The token name to read.
 * @returns The token's current resolved value.
 */
export function useGenomeTrait(genome: Genome, name: string): Primitive {
  const subscribe = useCallback(
    (onChange: () => void) => genome.subscribe(onChange),
    [genome],
  );

  const getSnapshot = useCallback(() => genome.getTrait(name), [genome, name]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
