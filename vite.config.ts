import { fileURLToPath, URL } from 'url';
//import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { dynamicImportVarsOptions } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      exclude: /.*main\.scss/,
    }),
  ],
  build: {
    rollupOptions: {
      external: (id) => {
        if (id.endsWith('.py') || id.endsWith('.csv')) {
          console.log('Ignoring ...:');
          console.log(id);
        }
        return id.endsWith('.py') || id.endsWith('.csv');
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: false,
        additionalData(source: string, fp: string) {
          if (fp.endsWith('main.scss')) return source;
          return `@import "@/assets/main.scss"; ${source}`;
        },
      },
    },
  },
  base: './',
});
