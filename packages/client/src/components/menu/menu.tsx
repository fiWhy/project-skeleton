import type { ReactElement } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { Props } from './types.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * `<Menu/>` component.
 */
export const Menu = ({ items }: Props): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={clsx(
          'bg-current fixed z-20 xl:flex flex w-full flex-1 translate-y-1/4 flex-col gap-10 bg-natural-yellow py-6 text-center shadow-field xl:relative xl:flex-row xl:justify-end xl:gap-6 xl:py-0 xl:pr-6 xl:text-left xl:shadow-none',
          {
            hidden: !open
          }
        )}
      >
        {items.map(({ label, to }) => (
          <div key={label}>
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
            >
              {label}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="z-20 pr-6 xl:hidden xl:pointer-events-none">
        <nav>
          <button
            className="text-gray-500 bg-white relative h-10 w-10 focus:outline-none"
            onClick={(): void => setOpen((open) => !open)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={twMerge(
                  'absolute block h-0.5 w-5 transform bg-natural-black transition duration-500 ease-in-out',
                  clsx({
                    'rotate-45': open,
                    '-translate-y-1.5': !open
                  })
                )}
              ></span>
              <span
                aria-hidden="true"
                className={twMerge(
                  'absolute block h-0.5 w-5 transform bg-natural-black transition duration-500 ease-in-out',
                  clsx({
                    'opacity-0': open
                  })
                )}
              ></span>
              <span
                aria-hidden="true"
                className={twMerge(
                  'absolute block h-0.5 w-5 transform bg-natural-black transition duration-500 ease-in-out',
                  clsx({ '-rotate-45': open, ' translate-y-1.5': !open })
                )}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
};
