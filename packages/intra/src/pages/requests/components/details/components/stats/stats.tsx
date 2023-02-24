import { routes as usersRoutes } from '#~/pages/users/index.js';
import { adapt } from '#~/utils/date.js';
import { clsx } from 'clsx';
import { last } from 'lodash-es';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useLogic } from './hooks/index.js';
import type { Props } from './types.js';
import { RequestStatusType } from '@prisma/client';

/**
 * `<Stats>` component.
 */
export const Stats = ({ request }: Props): ReactElement => {
  const { receivers } = useLogic(request);
  const status = last(request.statuses);

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Sender</div>
        <div className="stat-value">
          <Link to={usersRoutes.detailsById.getDirectPath(request.sender.id)}>
            {request.sender.name}
          </Link>
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Receivers</div>
        <div className="stat-value">
          <ul>
            {receivers.map((receiver) => (
              <li key={receiver.id}>
                <Link to={usersRoutes.detailsById.getDirectPath(receiver.id)}>
                  {receiver.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="stat-title">List of projects' managers.</div>
      </div>
      <div className="stat">
        <div className="stat-title">Period</div>
        <div className="stat-desc">
          <div>From: {adapt(request.start)}</div>
          <div>To: {adapt(request.end)}</div>
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Resolver</div>
        {!!request.statuses.length && status && (
          <div className="stat-value">
            <Link
              to={usersRoutes.detailsById.getDirectPath(status.resolver.id)}
            >
              {status.resolver.name}
            </Link>
          </div>
        )}
        <div
          className={clsx('stat-title', {
            'text-accent': status?.status === RequestStatusType.Resolved,
            'text-error': status?.status === RequestStatusType.Rejected
          })}
        >
          {status?.status ?? 'Pending'}
        </div>
        {!!status && (
          <div className="stat-desc text-secondary">
            Status changed at: {adapt(status.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};
