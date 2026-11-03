import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

const webRoot = path.resolve(__dirname, '../../apps/web')
const webSrc = path.join(webRoot, 'src')
const webModules = path.join(webRoot, 'node_modules')
const protoSrc = path.resolve(__dirname, './src')
const apiSrc = path.resolve(__dirname, '../../apps/api/src')

export default defineConfig({
  root: __dirname,
  plugins: [viteReact()],
  resolve: {
    alias: {
      // Template source of truth — same `~` alias as apps/web
      '~': webSrc,
      // Prototype-only code (search flow, store, moderator)
      '@proto': protoSrc,
      // Template mock data (same module the API serves) — search catalog source
      '@template-api': apiSrc,
      react: path.join(webModules, 'react'),
      'react-dom': path.join(webModules, 'react-dom'),
      '@nutanix-ui/prism-reactjs': path.join(
        webModules,
        '@nutanix-ui/prism-reactjs',
      ),
      '@nutanix-core/prism-ui-themes-common': path.join(
        webModules,
        '@nutanix-core/prism-ui-themes-common',
      ),
      '@nutanix-ui/ebr-ui': path.join(
        webModules,
        '@nutanix-ui/ebr-ui/dist/index.js',
      ),
      '~@nutanix-ui': path.join(webModules, '@nutanix-ui'),
      '~@nutanix-core': path.join(webModules, '@nutanix-core'),
    },
  },
  server: {
    port: 3010,
    strictPort: true,
    // Same API proxy as apps/web — needed for VMs Entity Browser mock data
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
    fs: {
      allow: [
        path.resolve(__dirname),
        webRoot,
        webModules,
        apiSrc,
        path.resolve(__dirname, '../../node_modules'),
      ],
    },
  },
})
