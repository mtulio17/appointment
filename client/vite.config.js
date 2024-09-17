import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      includePublic: true,
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      png: {
        quality: [0.5, 0.7],
      },
      jpeg: {
        quality: 80,
      },
      svg: {
        removeViewBox: true,
        removeDimensions: true,
      },
    }),
  ],
});
