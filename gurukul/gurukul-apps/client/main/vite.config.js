import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../../../../packages/components"),
      "@hooks": path.resolve(__dirname, "../../../../packages/hooks"),
      "@utils": path.resolve(__dirname, "../../../../packages/utils"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../../build-client/dist-main"),
    sourcemap: true,
    minify: "esbuild",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
    open: true,
  },
});
