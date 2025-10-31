import { defineConfig } from 'vite';

export default defineConfig({
  base: '/piskvorky/',
  root: './src',
  build: {
    outDir: '../dist'
  }
});
