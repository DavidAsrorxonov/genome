import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { Genome } from "@genomejs/core";
import { useGenomeTrait } from "./index";

function makeTestComponent(genome: Genome) {
  return defineComponent({
    setup() {
      const value = useGenomeTrait(genome, "label");
      return () => h("div", { "data-testid": "value" }, value.value);
    },
  });
}

describe("useGenomeTrait (vue)", () => {
  it("reads the current trait value on initial render", () => {
    const target = document.createElement("div");
    const genome = new Genome(
      {
        primitives: {},
        tokens: {
          label: (_dna, ctx) => (ctx.mode === "dark" ? "Dark" : "Light"),
        },
      },
      target,
    );
    genome.mutate({ mode: "light" });

    const wrapper = mount(makeTestComponent(genome));
    expect(wrapper.get('[data-testid="value"]').text()).toBe("Light");
  });

  it("re-renders when the genome mutates", async () => {
    const target = document.createElement("div");
    const genome = new Genome(
      {
        primitives: {},
        tokens: {
          label: (_dna, ctx) => (ctx.mode === "dark" ? "Dark" : "Light"),
        },
      },
      target,
    );
    genome.mutate({ mode: "light" });

    const wrapper = mount(makeTestComponent(genome));
    expect(wrapper.get('[data-testid="value"]').text()).toBe("Light");

    genome.mutate({ mode: "dark" });
    await nextTick();

    expect(wrapper.get('[data-testid="value"]').text()).toBe("Dark");
  });
});
