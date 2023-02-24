import type { Prisma } from '@prisma/client';

export interface InfoUser {
  vacationIncrement: 2;
}

export type CtxUser = Prisma.UserGetPayload<{
  include: {
    projects: true;
    roles: {
      include: {
        role: true;
      };
    };
  };
}> & {
  vacations?: number;
  vacationDaysPerYear?: number;
};
