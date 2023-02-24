import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { Props } from './types.js';
import { routes } from '#~/pages/users/index.js';

/**
 * `<Stats>` component.
 */
export const Stats = ({ project }: Props): ReactElement => {
  return (
    <div className="stats stats-vertical flex max-w-full flex-row shadow lg:stats-horizontal">
      <div className="stat flex-1">
        <div className="stat-title">Owner</div>
        <div className="stat-value whitespace-normal text-base">
          <Link
            className="link"
            to={routes.detailsById.getDirectPath(project.ownerId)}
          >
            {project.owner.name} ({project.owner.email})
          </Link>
        </div>
      </div>
      <div className="stat flex-1">
        <div className="stat-title">Manager</div>
        <div className="stat-value whitespace-normal text-base">
          <Link
            className="link"
            to={routes.detailsById.getDirectPath(project.manager.id)}
          >
            {project.manager.name} ({project.manager.email})
          </Link>
        </div>
      </div>
      <div className="stat flex-1">
        <div className="stat-title">Specialists</div>
        <div className="stat-value">{project.members.length} </div>
      </div>
    </div>
  );
};
