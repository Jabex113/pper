import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load .env file for environment variables if it exists

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'frontend'),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
});