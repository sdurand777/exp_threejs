import { defineConfig } from 'vite';

export default defineConfig({
  root: './public',  // Le dossier source pour les fichiers Vite (src)
  build: {
    outDir: '../dist',  // Le dossier où les fichiers compilés seront placés après la construction
  },
  base: '/exp_threejs/',
});
