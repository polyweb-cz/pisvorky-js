import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pisvorky-js/',
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
