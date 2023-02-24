import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes.js';
import { lazy } from 'react';

const List = lazy(() => import('./components/list/list.jsx'));
const Details = lazy(() => import('./components/details/details.jsx'));
const Edit = lazy(() => import('./components/edit/edit.jsx'));

/**
 * `<Requests/>` component.
 */
export const Requests = (): ReactElement => {
  return (
    <Routes>
      <Route path={routes.list.path} element={<List />} />
      <Route path={routes.details.path} element={<Details />} />
      <Route path={routes.edit.path} element={<Edit />} />
      <Route path={routes.create.path} element={<Edit />} />
    </Routes>
  );
};

export default Requests;
