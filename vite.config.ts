import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', 'chart.js', 'react-chartjs-2'],
          'pdf': ['jspdf', 'html2canvas'],
          'docx': ['docx', 'file-saver']
        }
      }
    }
  },
  server: {
    port: 5173
  }
});