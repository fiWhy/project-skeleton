import { dateFormat, calendarFormat } from '#~/constants/date.js';
import { format as fnsFormat } from 'date-fns';

/**
 * Adapt date to the single format.
 *
 * @param date - Provided date.
 * @param format - Format template.
 * @returns Adapted date.
 */
export const adapt = (date: string | Date, format = dateFormat): string =>
  fnsFormat(new Date(date), format);

/**
 * Format date to calendar input format.
 *
 * @param date -  Provided date.
 * @returns Date string.
 */
export const dateToCalendarString = (date: Date): string =>
  adapt(date, calendarFormat);
