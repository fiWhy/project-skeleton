import { events, workspaceData } from '#~/constants.js';
import { prisma } from '#~/prisma.js';
import type { CtxUser } from '#~/types.js';
import type { RequestInput } from '@dot/models';
import { calendarClient } from '@dot/services';
import type { Prisma } from '@prisma/client';
import { RequestType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { differenceInBusinessDays } from 'date-fns';
import { intersection, map } from 'lodash-es';
import type zod from 'zod';
import { sendReport, sendVacationRequest } from './mail.js';

/**
 * @param start - Vacation start.
 * @param end - Vacation end.
 * @param user - Current user.
 */
export const checkVacationAvailability = (
  start: Date,
  end: Date,
  user: CtxUser
): void => {
  const diff = Math.abs(differenceInBusinessDays(start, end));

  if (diff === 0 || diff < 0 || diff > user.vacations!) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `You don't have ${diff} vacation days available`
    });
  }
};

/**
 * @param projects - Projects' ids.
 * @param user - Context user.
 */
export const checkCurrentUserHasProjects = (
  projects: string[],
  user: CtxUser
): void => {
  if (
    !projects.length ||
    intersection(map(user.projects, 'id'), projects).length !== projects.length
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `You are not a part of some project you've selected`
    });
  }
};

/**
 * Create event in calendar.
 *
 * @param request - Created request.
 */
export const addVacationToCalendarAndUpdateId = async (
  request: Prisma.RequestGetPayload<{
    include: {
      sender: true;
    };
  }>
): Promise<void> => {
  const eventData = await calendarClient.events.insert({
    calendarId: workspaceData.calendars.pto,
    requestBody: events.pto(request.start, request.end, {
      email: request.sender.email,
      displayName: request.sender.name
    })
  });

  await prisma.request.update({
    where: {
      id: request.id
    },
    data: {
      eventId: eventData.data.id
    }
  });
};

/**
 * Remove event from calendar.
 *
 * @param request - Created request.
 */
export const clearCalendarFromEventAndRemoveId = async (
  request: Prisma.RequestGetPayload<null>
): Promise<void> => {
  await calendarClient.events.delete({
    calendarId: workspaceData.calendars.pto,
    eventId: request.eventId ?? ''
  });

  await prisma.request.update({
    where: {
      id: request.id
    },
    data: {
      eventId: null
    }
  });
};

/**
 * @param request - Request input.
 * @param user - Current user.
 */
export const checkRequest = (
  request: zod.infer<typeof RequestInput>,
  user: CtxUser
): void => {
  switch (request.type) {
    case RequestType.Vacation:
      checkVacationAvailability(
        new Date(request.start),
        new Date(request.end),
        user
      );
      break;
  }

  checkCurrentUserHasProjects(request.projects, user);
};

/**
 * Notify all every related person.
 *
 * @param request - Request for notification.
 * @param user - Current user.
 */
export const notifyAssignees = (
  request: Prisma.RequestGetPayload<{
    include: {
      sender: true;
    };
  }>
): void => {
  switch (request.type) {
    case RequestType.Vacation:
      void sendVacationRequest(request, []);
      return;

    case RequestType.Report:
      void sendReport(request, []);
      return;
  }
};
