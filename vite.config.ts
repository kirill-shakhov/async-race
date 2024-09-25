import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@modules': fileURLToPath(new URL('src/modules', import.meta.url)),
      '@moduleGarage': fileURLToPath(new URL('src/modules/garage', import.meta.url)),
      '@moduleWinners': fileURLToPath(new URL('src/modules/winners', import.meta.url)),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
});
