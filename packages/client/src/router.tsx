import { routes } from '#~/constants/index.js';
import { Home } from '#~/pages/index.js';
import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/**
 * `<Router>` component.
 */
export const Router = (): ReactElement => (
  <Routes>
    <Route path={routes.home.path} element={<Home />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
