import { Menu } from '#~/components/index.js';
import { routes } from '#~/constants/index.js';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/**
 * `<Header />` component.
 */
export const Header = ({ className, ...props }: Props): ReactElement => {
  return (
    <header
      {...props}
      className={twMerge(
        'fixed z-20 flex w-full flex-row items-center justify-between py-3 xl:shadow-field',
        className
      )}
    >
      <div className="w-inline z-30 inline-flex max-w-[84px] pl-6 xl:max-w-fit">
        Logo
      </div>
      <Menu
        items={[
          {
            label: 'Home',
            to: routes.home.getPath()
          }
        ]}
      />
    </header>
  );
};
