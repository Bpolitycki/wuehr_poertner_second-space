import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      exclude: /.*main\.scss/,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: false,
        additionalData(source: string, fp: string) {
          if (fp.endsWith("main.scss")) return source;
          return `@import "@/assets/main.scss"; ${source}`;
        },
      },
    },
  },
});
