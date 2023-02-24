import { prisma } from '#~/prisma.js';
import { sendInfo } from '#~/utils/mail.js';
import { authClient } from '@dot/services';
import { TRPCError } from '@trpc/server';
import { emailConfig } from '../constants.js';
import {
  CallbackFormPayload,
  IdTokenPayload,
  RefreshTokenPayload,
  UserDetailsPayload,
  UsersListPayload
} from '../models.js';
import { getUser, getUserProfile } from '../requests/index.js';
import { protectedByRolesProcedure, publicProcedure, router } from '../trpc.js';

export const routes = router({
  profile: protectedByRolesProcedure()
    .input(UserDetailsPayload)
    .query(async ({ input, ctx }) =>
      getUserProfile({ id: input.id ?? ctx.user.id }, ctx.user)
    ),
  list: protectedByRolesProcedure()
    .input(UsersListPayload)
    .query(({ input }) =>
      prisma.user.findMany({
        where: input?.search
          ? {
              email: {
                contains: input.search
              }
            }
          : {}
      })
    ),
  details: protectedByRolesProcedure()
    .input(UserDetailsPayload)
    .query(({ input, ctx }) => getUser({ id: input.id ?? ctx.user.id })),
  getIdToken: publicProcedure
    .input(IdTokenPayload)
    .mutation(async ({ input }) => {
      try {
        const tokens = (await authClient.getToken(input.code)).tokens;

        const payload = (
          await authClient.verifyIdToken({
            idToken: tokens.id_token!
          })
        ).getPayload()!;

        await prisma.user.upsert({
          create: {
            email: payload.email!,
            name: payload.name!,
            picture: payload.picture,
            startFrom: new Date()
          },
          update: {
            picture: payload.picture
          },
          where: {
            email: payload.email
          }
        });

        return tokens;
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: 'UNAUTHORIZED'
        });
      }
    }),
  currentUser: protectedByRolesProcedure().query(({ ctx }) => ctx.user),
  refreshToken: publicProcedure
    .input(RefreshTokenPayload)
    .mutation(() => authClient.refreshAccessToken()),
  callback: publicProcedure
    .input(CallbackFormPayload)
    .mutation<unknown>(async (data) => {
      try {
        await sendInfo(
          {
            subject: 'Contact request',
            from: emailConfig.mailboxes.admin,
            to: emailConfig.mailboxes.info
          },
          {
            subject: 'Contact request',
            title: 'Contact request',
            content: Object.keys(data.input)
              .map(
                (key: keyof typeof data['input']) =>
                  `<strong>${key}</strong>: ${encodeURIComponent(
                    data.input[key] ?? ''
                  )}`
              )
              .join('<br/>')
          }
        );

        return {
          message: 'Success!'
        };
      } catch (err) {
        return {
          message: (err as Error).message
        };
      }
    })
});
