import { defaultConfig } from '@dot-tools/vite';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, mergeConfig } from 'vite';

export default defineConfig(
  mergeConfig(defaultConfig, {
    optimizeDeps: {
      include: ['@dot/ui/components']
    },
    resolve: {
      alias: {
        '#~': resolve(__dirname, './src'),
        '#styles': resolve(__dirname, './styles'),
        '.prisma/client/index-browser': join(
          dirname(fileURLToPath(import.meta.url)),
          '../../node_modules/.prisma/client/index-browser.js'
        )
      }
    }
  })
);
