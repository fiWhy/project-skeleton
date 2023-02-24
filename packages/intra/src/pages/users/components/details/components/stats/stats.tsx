import type { ReactElement } from 'react';
import type { Props } from './types.js';

/**
 * `<Stats/>` component.
 */
export const Stats = ({ profile }: Props): ReactElement => {
  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Vacation Days Left</div>
        <div className="stat-value">{profile.vacations}</div>
        <div className="stat-desc">
          You receive {((profile.vacationDaysPerYear ?? 1) / 12).toFixed(2)}{' '}
          days per month
        </div>
      </div>
    </div>
  );
};
