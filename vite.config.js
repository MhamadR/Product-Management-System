import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://antiwar-containers.000webhostapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the "/api" prefix
      },
    },
  },
  plugins: [react()],
});
