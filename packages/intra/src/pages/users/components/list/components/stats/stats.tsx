import type { ReactElement } from 'react';
import type { Props } from './types.js';

/**
 * `<Stats>` component.
 */
export const Stats = ({ users }: Props): ReactElement => {
  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Users</div>
        <div className="stat-value">{users.length}</div>
      </div>
    </div>
  );
};
