import { PrivateWrapper } from '#~/components/index.js';
import type { ReactElement } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes.js';
import { Role } from '@dot/models';

const List = lazy(() => import('./components/list/list.jsx'));
const Details = lazy(() => import('./components/details/details.jsx'));
const Edit = lazy(() => import('./components/edit/edit.jsx'));

/**
 * `<Projects/>` component.
 */
export const Projects = (): ReactElement => {
  return (
    <Routes>
      <Route path={routes.list.path} element={<List />} />
      <Route path={routes.details.path} element={<Details />} />
      <Route
        path={'/'}
        element={
          <PrivateWrapper
            roles={[Role.CEO, Role.CTO]}
            redirect={routes.list.path}
          />
        }
      >
        <Route path={routes.edit.path} element={<Edit />} />
        <Route path={routes.create.path} element={<Edit />} />
      </Route>
    </Routes>
  );
};

export default Projects;
