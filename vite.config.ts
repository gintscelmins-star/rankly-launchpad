import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    target: "esnext",
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Isolate heavy libs into separate cacheable chunks
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("react-dom")) return "react-dom";
            if (id.includes("react-hook-form")) return "react-hook-form";
            if (id.includes("sonner")) return "sonner";
            // Everything else from node_modules in one vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
}));
