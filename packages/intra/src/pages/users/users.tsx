import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes.js';

const List = lazy(async () => import('./components/list/list.jsx'));
const Details = lazy(async () => import('./components/details/details.jsx'));

/**
 * `<Users/>` component.
 */
export const Users = (): ReactElement => {
  return (
    <Suspense>
      <Routes>
        <Route path={routes.list.path} element={<List />} />
        <Route path={routes.details.path} element={<Details />} />
        <Route path={routes.detailsById.path} element={<Details />} />
      </Routes>
    </Suspense>
  );
};

export default Users;
