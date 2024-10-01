import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main.js",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
