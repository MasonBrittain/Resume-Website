import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Locally, /v2 without the slash would fall back to the original page.
// Send it to /v2/ (vercel.json does the same in production).
const redirectV2 = (req, res, next) => {
  if (req.url === '/v2' || req.url?.startsWith('/v2?')) {
    res.writeHead(301, { Location: req.url.replace('/v2', '/v2/') });
    res.end();
    return;
  }
  next();
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'v2-trailing-slash',
      configureServer(server) {
        server.middlewares.use(redirectV2);
      },
      configurePreviewServer(server) {
        server.middlewares.use(redirectV2);
      },
    },
  ],
  build: {
    rollupOptions: {
      // Two pages from one build: the original site at / and the new one at /v2.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        v2: resolve(import.meta.dirname, 'v2/index.html'),
      },
    },
  },
});
