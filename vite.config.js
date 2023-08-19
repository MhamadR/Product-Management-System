import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://antiwar-containers.000webhostapp.com/",
        changeOrigin: true, // Change the Origin header in the request to match the target server's origin.
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the "/api" prefix from the path before making the request
      },
    },
  },
  plugins: [react()],
});
