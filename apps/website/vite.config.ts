import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, "index.html"),
        favorites: path.resolve(rootDir, "favorites.html"),
      },
    },
  },
});
