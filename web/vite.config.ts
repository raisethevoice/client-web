import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

const pwaManifestConfig: any = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Raise The Voice',
    short_name: 'rtv',
    description: 'Raise The Voice',
    icons: [
      {
        src: '/img-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    lang: 'en-US',
    scope: '/',
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(pwaManifestConfig)],
});
