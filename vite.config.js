import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux'],
  },
  server: {
    hmr: {
      timeout: 30000, // Increase timeout to avoid HMR issues
    },
  },
  build: {
    target: 'esnext',
  },
});
