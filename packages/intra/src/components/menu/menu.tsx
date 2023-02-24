import type { ReactElement } from 'react';
import { MenuItem } from './components/index.js';
import type { Props } from './types.js';

/**
 * `<Menu/>` component.
 */
export const Menu = ({
  items = [],
  dropdownItems = [],
  picture
}: Props): ReactElement => {
  return (
    <>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {items.map(({ label, to, action }) => (
            <li key={label}>
              <MenuItem to={to ?? ''} action={action}>
                {label}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src={picture ?? ''} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-4 w-52 bg-base-200 p-2 shadow"
          >
            {dropdownItems.map(({ label, to, action }) => (
              <li key={label}>
                <MenuItem to={to ?? ''} action={action}>
                  {label}
                </MenuItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
