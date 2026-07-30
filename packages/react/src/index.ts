import { useSyncExternalStore } from "react";
import type { Genome, Primitive } from "@genome/core";

/**
 * Subscribes a React component to a resolved Genome token value.
 */
export function useGenomeTrait(genome: Genome, name: string): Primitive {
  return useSyncExternalStore(
    (onChange) => genome.subscribe(onChange),
    () => genome.getTrait(name),
  );
}
