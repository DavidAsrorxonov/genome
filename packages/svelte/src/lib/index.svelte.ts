import type { Primitive, Genome } from "@genome/core";

/**
 * Subscribes a Svelte component to a resolved Genome token value.
 *
 * @param genome - The Genome instance to subscribe to.
 * @param name - The token name to read.
 * @returns A reactive wrapper for the token's current resolved value.
 */
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
