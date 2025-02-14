import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../../../../packages/components'),
      '@hooks': path.resolve(__dirname, '../../../../packages/hooks'),
      '@utils': path.resolve(__dirname, '../../../../packages/utils')
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist-main'),
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true,
  }
})
