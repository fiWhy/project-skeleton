import { getHasRole } from '@dot/query/utils';
import { useUser } from '@dot/auth';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { Role } from '@dot/models';

const Details = lazy(
  () => import('#~/pages/users/components/details/details.jsx')
);
const UsersList = lazy(() => import('#~/pages/users/components/list/list.jsx'));

/**
 * `<Main>` component.
 */
export const Home = (): ReactElement => {
  const user = useUser();

  if (!user) return <></>;

  return (
    <Suspense fallback={<>Loading...</>}>
      {getHasRole(user, [Role.CTO, Role.CEO]) ? (
        <UsersList />
      ) : (
        <Details id={user.id} />
      )}
    </Suspense>
  );
};

export default Home;
