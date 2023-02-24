import { routes } from '#~/pages/projects/routes.js';
import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  projects: FromAppRouter['projects']['list'];
  edit: (id: string) => void;
} => {
  const { data: projects = [] } = request.projects.list.useQuery();
  const navigate = useNavigate();

  return {
    projects,
    edit: useCallback(
      (id: string): void => {
        navigate(routes.edit.getDirectPath(id));
      },
      [navigate]
    )
  };
};
