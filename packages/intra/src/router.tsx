import { LoginWrapper, PrivateWrapper } from '#~/components/index.js';
import { routes } from '#~/constants/index.js';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Login = lazy(async () => import('./pages/login/login.jsx'));
const Home = lazy(async () => import('./pages/home/home.jsx'));
const Users = lazy(async () => import('./pages/users/users.jsx'));
const Projects = lazy(async () => import('./pages/projects/projects.jsx'));
const Requests = lazy(async () => import('./pages/requests/requests.jsx'));

/**
 * `<Router>` component.
 */
export const Router = (): ReactElement => (
  <Suspense>
    <Routes>
      <Route
        path={routes.home.path}
        element={
          <PrivateWrapper
            ignoreVisited={[routes.login.path]}
            redirect={routes.login.path}
          />
        }
      >
        <Route path={routes.home.path} element={<Home />} />
        <Route path={`${routes.users.path}/*`} element={<Users />} />
        <Route path={`${routes.projects.path}/*`} element={<Projects />} />
        <Route path={`${routes.requests.path}/*`} element={<Requests />} />
      </Route>
      <Route
        path={routes.home.path}
        element={<LoginWrapper redirect={routes.home.path} />}
      >
        <Route path={routes.login.path} element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
