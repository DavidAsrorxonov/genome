import type { Primitive, Genome } from "@genome/core";

export function genomeTrait(genome: Genome, name: string) {
  let value = $state(genome.getTrait(name));

  $effect(() => {
    const unsubscribe = genome.subscribe(() => {
      value = genome.getTrait(name);
    });

    return unsubscribe;
  });

  return {
    get value() {
      return value;
    },
  };
}
