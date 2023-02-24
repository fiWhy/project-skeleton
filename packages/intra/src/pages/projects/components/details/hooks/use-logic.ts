import type { Maybe } from '@dot-tools/types';
import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { useParams } from 'react-router-dom';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  project: Maybe<FromAppRouter['projects']['details']>;
  projectUsers: FromAppRouter['users']['list'];
} => {
  const { id } = useParams<{ id: string }>();
  const { data: project } = request.projects.details.useQuery({ id: id! });

  const projectUsers =
    project?.members.map((member) => ({
      ...member.user,
      startFrom: member.createdAt
    })) ?? [];

  return { project, projectUsers };
};
