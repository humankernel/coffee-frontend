/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite(), ViteImageOptimizer()],
    test: {
        globals: true,
        environment: "jsdom",
    },
    server: { port: 3000 },
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
    },
});
