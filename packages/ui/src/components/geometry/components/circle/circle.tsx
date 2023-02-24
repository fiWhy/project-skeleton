import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/** `<Circle>` component. */
export const Circle = ({ className, ...props }: Props): ReactElement => (
  <div {...props} className={twMerge('rounded-full', className)} />
);
