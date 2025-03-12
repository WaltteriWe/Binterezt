import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/~walttewe/yksilotehtava-25k",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.js",
  },
});
