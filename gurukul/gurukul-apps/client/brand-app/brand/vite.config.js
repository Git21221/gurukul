import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

// Load root-level .env manually
dotenv.config({ path: path.resolve(__dirname, '../../../../../.env') });

// Optional: log to verify
console.log('ENV:', process.env.VITE_ENVIRONMENT);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@components': path.resolve(
        __dirname,
        '../../../../../../packages/common/components'
      ),
      '@hooks': path.resolve(__dirname, '../../../../../packages/common/hooks'),
      '@utils': path.resolve(__dirname, '../../../../../packages/common/utils'),
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
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve(
            __dirname,
            '../../../../../../packages/shared/gurukul-apps/client/colors'
          ),
        ],
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../../../build-client/dist-brand'),
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
  server: {
    port: 3002,
    open: true,
  },
  preview: {
    port: 4002,
    open: true,
  },
});
