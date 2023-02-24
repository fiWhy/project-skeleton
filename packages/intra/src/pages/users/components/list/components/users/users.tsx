import { routes } from '#~/pages/users/index.js';
import { adapt } from '#~/utils/date.js';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { Props } from './types.js';

/**
 * `<Users/>` component.
 */
export const Users = ({ users }: Props): ReactElement => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Start From</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <td>
              <Link
                className="link"
                to={routes.detailsById.getDirectPath(user.id)}
              >
                {user.name}
              </Link>
            </td>
            <td>{user.email}</td>
            <td>{adapt(user.startFrom)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
