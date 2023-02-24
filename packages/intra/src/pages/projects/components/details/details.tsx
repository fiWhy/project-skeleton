import type { ReactElement } from 'react';
import { Stats } from './components/index.js';
import { useLogic } from './hooks/index.js';
import { lazy, Suspense } from 'react';

const UsersList = lazy(
  () => import('#~/pages/users/components/list/components/users/users.jsx')
);

/**
 * `<Details/>` component.
 */
export const Details = (): ReactElement => {
  const { project, projectUsers } = useLogic();

  return (
    <div className="flex flex-col">
      <h2>Project {project?.name}</h2>
      {project ? <Stats project={project} /> : null}
      <div className="mt-16">
        <h2>Project Specialists</h2>
        <Suspense>
          <UsersList users={projectUsers} />
        </Suspense>
      </div>
    </div>
  );
};

export default Details;
