import { adminRoles } from '@dot/models';
import { request } from '@dot/query';
import { getHasRole } from '@dot/query/utils';
import type { FromAppRouter } from '@dot/server';
import { useParams } from 'react-router-dom';
import { useUser } from '@dot/auth';
import type { Maybe } from '@dot-tools/types';

/**
 * Logic Hook.
 *
 * @param props - Logic props.
 * @param props.id - User id.
 * @returns Logic functionality.
 */
export const useLogic = ({
  id: passedId
}: {
  id?: Maybe<string>;
}): {
  user?: FromAppRouter['users']['profile'];
  isOwner: boolean;
} => {
  const currentUser = useUser();
  const { id } = useParams<{ id: string }>();
  const actualId = passedId ?? id;
  const isOwnPage = !!actualId && actualId === currentUser?.id;
  const { data: user } = request.users.profile.useQuery(
    {
      id: actualId
    },
    {
      enabled: !isOwnPage
    }
  );

  const isOwner =
    !actualId ||
    (!!user && (user.id === actualId || getHasRole(user, adminRoles)));

  return {
    user: isOwnPage ? currentUser : user,
    isOwner
  };
};
