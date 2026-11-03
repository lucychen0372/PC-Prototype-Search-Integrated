import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ autoCodeSplitting: true }), viteReact()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~@nutanix-ui': path.resolve(__dirname, 'node_modules/@nutanix-ui'),
      '~@nutanix-core': path.resolve(__dirname, 'node_modules/@nutanix-core'),
      '@nutanix-ui/ebr-ui': path.resolve(
        __dirname,
        'node_modules/@nutanix-ui/ebr-ui/dist/index.js',
      ),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/PrismGateway/services/rest/v1/application/user_data': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
