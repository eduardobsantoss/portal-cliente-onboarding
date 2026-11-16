import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  // Endpoint do lead de newsletter da landing (Firebase Function do landing-page-gci).
  // Em dev, aponta para o emulador local, igual ao proxy do projeto da landing.
  const newsletterTarget = env.NEWSLETTER_PROXY_TARGET || 'http://127.0.0.1:5001';
  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api/newsletter-lead': {
          target: newsletterTarget,
          changeOrigin: true,
          rewrite: () => '/minerva-gestao/southamerica-east1/submitNewsletterLead',
        },
      },
    },
  };
});
