import { routes as rootRoutes } from '#~/constants/index.js';
import { usersRoutes } from '#~/pages/index.js';
import { adapt } from '#~/utils/date.js';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes.js';
import { useLogic } from './hooks/index.js';

/**
 * `<List/>` component.
 */
export const List = (): ReactElement => {
  const { projects, edit } = useLogic();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <h2 className="flex w-full">Projects</h2>
        <div>
          <Link to={routes.create.getPath()} relative="path">
            <button className="btn-primary btn-active btn">Create</button>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Manager</th>
              <th>Start From</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link
                    className="link"
                    to={rootRoutes.projectDetails.getPath(project.id)}
                  >
                    {project.name}
                  </Link>
                </td>
                <td>
                  <Link
                    className="link"
                    to={usersRoutes.details.getDirectPath(project.owner.id)}
                  >
                    {project.owner.name}
                  </Link>
                </td>
                <td>
                  <Link
                    className="link"
                    to={usersRoutes.details.getDirectPath(project.managerId)}
                  >
                    {project.owner.name}
                  </Link>
                </td>
                <td>{adapt(project.createdAt)}</td>
                <td>
                  <button
                    className="btn-primary btn"
                    onClick={(): void => {
                      edit(project.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
