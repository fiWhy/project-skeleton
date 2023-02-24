import { Menu } from '#~/components/index.js';
import { routes } from '#~/constants/index.js';
import { usersRoutes } from '#~/pages/index.js';
import { useAuth } from '@dot/auth';
import { request } from '@dot/query';
import Logo from '@dot/ui/assets/images/logo.svg';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types.js';

/**
 * `<Header />` component.
 */
export const Header = ({ className, ...props }: Props): ReactElement => {
  const { data: user } = request.users.currentUser.useQuery();
  const { logout } = useAuth();

  return (
    <header
      {...props}
      className={twMerge(
        'navbar rounded-box mb-16 bg-base-200 shadow-xl',
        className
      )}
    >
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">
          <Logo />
        </a>
      </div>
      <Menu
        picture={user?.picture}
        items={[
          {
            label: 'Home',
            to: routes.home.getPath()
          },
          {
            label: 'Projects',
            to: routes.projects.getPath()
          },
          {
            label: 'Requests',
            to: routes.requests.getPath()
          }
        ]}
        dropdownItems={[
          {
            label: 'Profile',
            to: usersRoutes.details.getDirectPath()
          },
          {
            label: 'Logout',
            action: logout
          }
        ]}
      />
    </header>
  );
};
