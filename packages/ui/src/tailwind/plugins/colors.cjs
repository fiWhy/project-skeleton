const { palette } = require('../themes/index.cjs');
const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addBase }) => {
  addBase({
    ...Object.fromEntries(
      Object.entries(palette).map(([mode, colorValues]) => [
        `[data-theme=${mode}]`,
        Object.entries(colorValues).reduce(
          (acc, [name, value]) => ({
            ...acc,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [`--color-${name}`]: value
          }),
          {}
        )
      ])
    )
  });
});
