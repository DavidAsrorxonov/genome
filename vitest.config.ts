import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  test: {
    environment: "jsdom",
    include: ["packages/*/src/**/*.test.ts", "packages/*/src/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
