const { defaultConfig } = require('@dot/ui/tailwind');
const { mergeConfigs } = require('tailwind-merge');

// @ts-expect-error merge conflict.
module.exports = mergeConfigs(defaultConfig, {
  content: ['./index.html', './src/**/*.{ts,tsx}']
});
