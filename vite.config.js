import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
    allowedHosts: true, // Allow all hosts (bypass DNS rebinding blocks for dev tunnels)
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
