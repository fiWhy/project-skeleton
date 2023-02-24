import type { ReactElement } from 'react';
import { Stats, Users } from './components/index.js';
import { useLogic } from './hooks/index.js';

/**
 * `<List/>` component.
 */
export const List = (): ReactElement => {
  const { users } = useLogic();

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-x-auto">
      <Stats users={users} />
      <div className="mt-8 w-full">
        <Users users={users} />
      </div>
    </div>
  );
};

export default List;
