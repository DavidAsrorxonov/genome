import { useSyncExternalStore } from "react";
import type { Genome, Primitive } from "@genome/core";

export function useGenomeTrait(genome: Genome, name: string): Primitive {
  return useSyncExternalStore(
    (onChange) => genome.subscribe(onChange),
    () => genome.getTrait(name),
  );
}
