const { default: react } = require('@vitejs/plugin-react');
const { default: eslint } = require('vite-plugin-eslint');
const { default: tsconfigPaths } = require('vite-tsconfig-paths');
const { default: svgLoader } = require('@andylacko/vite-svg-react-loader');

/** @type {import('vite').UserConfig} */
const defaultConfig = {
  plugins: [tsconfigPaths(), react(), eslint(), svgLoader()],
  envPrefix: 'DOT_',
  optimizeDeps: {
    include: ['@dot/ui/themes']
  }
};

module.exports = {
  defaultConfig
};
