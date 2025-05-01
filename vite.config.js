import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // ignore your json‑server db files so Vite won't reload when they change
      ignored: ["**/db.json", "**/shop.json", "**/inventory.json"],
    },
  },
});
