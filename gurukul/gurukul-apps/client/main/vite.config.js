import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

// Load root-level .env manually
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../../../../packages/components'),
      '@hooks': path.resolve(__dirname, '../../../../packages/hooks'),
      '@utils': path.resolve(__dirname, '../../../../packages/utils'),
    },
  },
  define: {
    'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(
      process.env.VITE_ENVIRONMENT
    ),
    'import.meta.env.VITE_MAIN_SERVER_PORT': JSON.stringify(
      process.env.VITE_MAIN_SERVER_PORT
    ),
    'import.meta.env.VITE_BRAND_SERVER_PORT': JSON.stringify(
      process.env.VITE_BRAND_SERVER_PORT
    ),
    'import.meta.env.VITE_MAIN_BASE_API_PROD_URL': JSON.stringify(
      process.env.VITE_MAIN_BASE_API_PROD_URL
    ),
    'import.meta.env.VITE_BRAND_BASE_API_PROD_URL': JSON.stringify(
      process.env.VITE_BRAND_BASE_API_PROD_URL
    ),
  },
  build: {
    outDir: path.resolve(__dirname, '../../../build-client/dist-main'),
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
    open: true,
  },
});
