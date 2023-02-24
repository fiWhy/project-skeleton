const { mergeConfigs } = require('tailwind-merge');
const { defaultConfig } = require('@dot/ui/tailwind');

// @ts-expect-error merge conflict.
module.exports = mergeConfigs(defaultConfig, {
  content: ['.storybook/preview.jsx']
});
