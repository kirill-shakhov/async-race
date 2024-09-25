import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@modules': '/src/modules',
      '@moduleGarage': '/src/modules/garage',
      '@moduleWinners': '/src/modules/winners',
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
});
