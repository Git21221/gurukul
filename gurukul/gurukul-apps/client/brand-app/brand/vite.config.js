import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../../../../../../packages/common/components/*"),
      "@hooks": path.resolve(__dirname, "../../../../../packages/common/hooks/*"),
      "@utils": path.resolve(__dirname, "../../../../../packages/common/utils/*"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../../../build-client/dist-brand"),
    sourcemap: true,
    minify: "esbuild",
    emptyOutDir: true,
  },
  server: {
    port: 3002,
    open: true,
  },
  preview: {
    port: 4002,
    open: true,
  },
});
