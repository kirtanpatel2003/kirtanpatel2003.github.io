import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // keep `gh-pages -d build` deploy working
  },
  server: {
    port: 3000,
  },
});
