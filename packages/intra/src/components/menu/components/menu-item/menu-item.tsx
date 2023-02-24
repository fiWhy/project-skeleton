import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import type { Props } from './types.js';

/**
 * `<MenuItem />` component.
 */
export const MenuItem = ({
  action,
  to,
  children,
  ...props
}: Props): ReactElement => {
  return action ? (
    <NavLink to={'#'} onClick={action} {...props}>
      {children}
    </NavLink>
  ) : (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }): string =>
        clsx(
          {
            underline: isActive
          },
          'underline-offset-4'
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};
