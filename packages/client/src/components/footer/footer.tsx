import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/** `<Footer>` component. */
export const Footer = ({ className, ...props }: Props): ReactElement => (
  <div
    {...props}
    className={twMerge(
      className,
      'flex-col gap-24 px-mobile py-14 xl:gap-8 xl:py-20 xl:px-40'
    )}
  >
    Footer
  </div>
);
