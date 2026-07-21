<script lang="ts">
  import type { Genome } from "@genome/core";
  import { genomeTrait } from "./index.svelte";

  let { genome, name }: { genome: Genome; name: string } = $props();

  const value = genomeTrait(genome, name);
</script>

<div data-testid="value">{value.value}</div>