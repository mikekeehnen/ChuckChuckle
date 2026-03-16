import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function normalizeBasePath(basePath?: string) {
  if (!basePath) {
    return "/";
  }

  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
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
