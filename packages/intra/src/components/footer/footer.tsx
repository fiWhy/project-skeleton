import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/** `<Footer>` component. */
export const Footer = ({ className, ...props }: Props): ReactElement => (
  <footer
    {...props}
    className={twMerge(
      className,
      'footer footer-center rounded-box bg-base-300 p-4 text-base-content'
    )}
  >
    Footer
  </footer>
);
