import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
console.log();
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
});
