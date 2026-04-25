// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // optional overrides go here
    build: {
      outDir: "dist", // make sure Vercel sees this
    },
  },
});
