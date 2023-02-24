import type { Maybe } from '@dot-tools/types';
import { Role } from '@dot/models';
import { getHasRole } from '@dot/query/utils';
import type { inferAsyncReturnType } from '@trpc/server';
import { initTRPC, TRPCError } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { authClient } from '@dot/services';
import { getUserProfile } from './requests/index.js';
import type { CtxUser } from './types.js';

/**
 * Create protected routes context.
 *
 * @param options - Context options.
 * @param options.req - Request options.
 */
export const createContext = async ({
  req
}: CreateNextContextOptions): Promise<{
  user: Maybe<CtxUser>;
  isAdmin: boolean;
}> => {
  try {
    const user = await authClient.verifyIdToken({
      idToken: (
        (req as Record<string, Record<string, unknown>>).headers
          .authorization as string
      ).split(' ')[1]
    });

    const payload = user.getPayload();

    if (!payload?.email) {
      throw new TRPCError({
        code: 'NOT_FOUND'
      });
    }

    const profile = await getUserProfile(
      {
        email: payload.email
      },
      undefined,
      {
        vacationData: true
      }
    );

    return {
      user: profile,
      isAdmin: getHasRole(profile, [Role.CEO, Role.CEO])
    };
  } catch (e: unknown) {
    return {
      user: undefined,
      isAdmin: false
    };
  }
};

// Get the context type
type Context = inferAsyncReturnType<typeof createContext>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Procedure to protect routes by role.
 *
 * @param restrictedRoles - Roles allowed to make request.
 * @returns Next.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const protectedByRolesProcedure = (restrictedRoles: Role[] = []) =>
  t.procedure.use(({ next, ctx }) => {
    if (
      !ctx.user ||
      (restrictedRoles.length && !getHasRole(ctx.user, restrictedRoles))
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED'
      });
    }

    return next({
      ctx: {
        user: ctx.user
      }
    });
  });
