import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/** `<Textarea>` component. */
export const Textarea = ({
  className,
  withError,
  children,
  ...props
}: Props): ReactElement => (
  <textarea
    {...props}
    className={twMerge(
      className,
      'shadow-field text-secondary-grey-90 disabled:text-secondary-grey-70 rounded-md px-4 py-4 text-sm focus-visible:outline-none',
      clsx({
        'border-primary-red border': withError
      })
    )}
  >
    {children}
  </textarea>
);
