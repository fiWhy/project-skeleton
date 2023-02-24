import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/**
 * `<Button>` component.
 */
export const Button = ({
  className,
  children,
  ...props
}: Props): ReactElement => {
  return (
    <button
      className={twMerge(
        className,
        'bg-secondary-blue-100 hover:bg-primary-blue disabled:bg-natural-grey text-natural-white box-border h-12 rounded-md text-center font-mono xl:text-lg transition duration-200'
      )}
      {...props}
    >
      {children}
    </button>
  );
};
