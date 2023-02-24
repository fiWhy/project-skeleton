import type { Maybe } from '@dot-tools/types';
import type { Prisma, User } from '@prisma/client';
import { RequestStatusType, RequestType } from '@prisma/client';
import {
  add,
  differenceInBusinessDays,
  differenceInWeeks,
  endOfYear,
  getISOWeeksInYear,
  getYear,
  startOfMonth,
  startOfYear
} from 'date-fns';
import { groupBy } from 'lodash-es';

/**
 * Accumulate amount of vacation days remain.
 *
 * @param user - User.
 * @param requests - User requests.
 * @param maxVacationDays - Maximum vacation days per year.
 * @param until - Until date.
 * @returns Days remain.
 */
export const getVacationDaysRemain = (
  user: User,
  requests: Prisma.RequestGetPayload<{
    include: {
      statuses: true;
    };
  }>[],
  maxVacationDays: number,
  until = new Date()
): number => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vacationRequestedDays = groupBy(
    requests.filter(
      (request) =>
        request.type === RequestType.Vacation &&
        request.senderId === user.id &&
        request.statuses[request.statuses.length - 1] &&
        request.statuses[request.statuses.length - 1].status ===
          RequestStatusType.Resolved
    ),
    (request) => getYear(new Date(request.start))
  );

  const workStart = new Date(user.startFrom);
  const currentYear = getYear(until);

  const years = Object.keys(vacationRequestedDays);
  const vacationsPerYear: Record<string, Maybe<number>> = years.reduce(
    (acc, year) => ({
      ...acc,
      [year]: vacationRequestedDays[year].reduce((acc, next) => {
        const diff = differenceInBusinessDays(
          new Date(next.start),
          new Date(next.end)
        );
        return acc + Math.abs(diff);
      }, 0)
    }),
    {}
  );

  let cursor = workStart;
  let vacations = 0;

  do {
    const perWeek = maxVacationDays / getISOWeeksInYear(cursor);
    const yearEnd = endOfYear(cursor);
    const startPoint = cursor > workStart ? cursor : workStart;
    const endPoint = yearEnd > until ? startOfMonth(until) : yearEnd;
    const weeksThisYear = differenceInWeeks(startPoint, endPoint);
    const totalThisYear = Math.abs(weeksThisYear * perWeek);

    const extractedRequested =
      totalThisYear - (vacationsPerYear[getYear(cursor)] ?? 0);

    vacations = Math.min(vacations + extractedRequested, maxVacationDays);
    cursor = startOfYear(
      add(cursor, {
        years: 1
      })
    );
  } while (getYear(cursor) <= currentYear);

  return Math.floor(vacations);
};

/**
 * Calculate pending requests.
 *
 * @param requests - Requests.
 * @returns Pending requests.
 */
export const getPendingRequests = <
  T extends Prisma.RequestGetPayload<{
    include: {
      statuses: true;
    };
  }>
>(
  requests: T[]
): T[] => requests.filter((request) => !request.statuses.length);
