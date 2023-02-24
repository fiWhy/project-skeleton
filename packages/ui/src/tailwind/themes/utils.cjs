/** @type {typeof import('./index.cjs').toCssRgb} */
const toCssRgb = ({ r, g, b }) => `${r} ${g} ${b}`;

/** @type {typeof import('./index.cjs').varToColor} */
const varToColor = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  toCssRgb,
  varToColor
};
