import { useToast } from '#~/providers/index.js';
import type { Maybe } from '@dot-tools/types';
import { useUser } from '@dot/auth';
import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { useQueryClient } from '@tanstack/react-query';
import { last, map } from 'lodash-es';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { RequestStatusType } from '@prisma/client';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  request: Maybe<FromAppRouter['requests']['details']>;
  changeStatus: (status: RequestStatusType) => void;
  status?: RequestStatusType;
  isResolving: boolean;
  isResolver: boolean;
} => {
  const user = useUser();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { info } = useToast();
  const { data } = request.requests.details.useQuery({
    id: id!
  });

  const { mutate: approve, isLoading } = request.requests.setStatus.useMutation(
    {
      onSuccess: (data) => {
        info(`Status changed to ${data.status}`);

        void queryClient.invalidateQueries([]);
      }
    }
  );

  const handleChangeStatus = useCallback(
    (status: RequestStatusType) => {
      if (id) {
        approve({
          id,
          status: status
        });
      }
    },
    [approve, id]
  );

  const projectIds = map(data?.projectRequests ?? [], 'projectId');

  return {
    request: data,
    changeStatus: handleChangeStatus,
    isResolving: isLoading,
    status: last(data?.statuses)?.status,
    isResolver:
      user?.projects.some((project) => projectIds.includes(project.id)) ?? false
  };
};
