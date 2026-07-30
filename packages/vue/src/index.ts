import { onMounted, onUnmounted, ref, type Ref } from "vue";
import type { Genome, Primitive } from "@genome/core";

/**
 * Subscribes a Vue component to a resolved Genome token value.
 */
export function useGenomeTrait(genome: Genome, name: string): Ref<Primitive> {
  const value = ref(genome.getTrait(name)) as Ref<Primitive>;
  let unsubscribe: () => void;

  onMounted(() => {
    unsubscribe = genome.subscribe(() => {
      value.value = genome.getTrait(name);
    });
  });

  onUnmounted(() => {
    unsubscribe?.();
  });

  return value;
}
