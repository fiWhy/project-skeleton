import type { ReactElement } from 'react';
import type { Props } from './types.js';

/** `<Tile>` component. */
export const Tile = ({ children, ...props }: Props): ReactElement => (
  <div {...props}>{children}</div>
);
