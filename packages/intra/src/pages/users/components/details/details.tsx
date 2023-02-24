import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Stats } from './components/index.js';
import { useLogic } from './hooks/index.js';
import type { Props } from './types.js';

/**
 * `<Details/>` component.
 */
export const Details = ({ id }: Props): ReactElement => {
  const { user, isOwner } = useLogic(useMemo(() => ({ id }), [id]));
  return (
    <div className="flex flex-col">
      {isOwner && user ? <Stats profile={user} /> : null}
      <div className="mt-8 flex flex-col">
        <h2>Profile</h2>
        {user ? (
          <div className="mt-8 flex flex-row items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src={user.picture ?? ''} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div>
                <span className="font-bold">Name:</span> {user.name}
              </div>
              <div>
                <span className="font-bold">Email:</span> {user.email}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Details;
