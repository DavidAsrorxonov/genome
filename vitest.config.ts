import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: [
      "packages/*/src/**/*.test.ts",
      "packages/*/src/**/*.test.tsx",
      "packages/*/src/**/*.svelte.test.ts",
    ],
    setupFiles: ["./vitest.setup.ts"],
  },
});
