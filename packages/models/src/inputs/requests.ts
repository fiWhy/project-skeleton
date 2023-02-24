import { RequestType } from '@prisma/client';
import {
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  differenceInBusinessDays
} from 'date-fns';
import { discriminatedUnion, literal } from 'zod';
import { array, nativeEnum, object, string } from 'zod';

const GeneralInput = object({
  type: literal(RequestType.General),
  start: string().optional(),
  end: string().optional(),
  projects: array(string()).nonempty(),
  message: string().optional()
});

const VacationInput = object({
  type: literal(RequestType.Vacation),
  start: string()
    .transform((value) => new Date(value))
    .refine(
      (value) => !isBefore(startOfDay(value), startOfDay(new Date())),
      `You can't select date before today!`
    )
    .transform((date) => date.toString()),
  end: string(),
  projects: array(string()).nonempty(),
  message: string().optional()
});

const ReportInput = object({
  type: literal(RequestType.Report),
  start: string()
    .transform((value) => new Date(value))
    .refine(
      (value) => !isAfter(endOfDay(value), endOfDay(new Date())),
      `You can't select date after today!`
    )
    .transform((date) => date.toString()),
  end: string()
    .transform((value) => new Date(value))
    .refine(
      (value) => !isAfter(endOfDay(value), endOfDay(new Date())),
      `You can't select date after today!`
    )
    .transform((date) => date.toString()),
  projects: array(string()).nonempty(),
  message: string().min(150)
});

const DecriminatedRequestInput = discriminatedUnion('type', [
  GeneralInput,
  VacationInput,
  ReportInput
]);

export const RequestInput = DecriminatedRequestInput.refine(
  (data) => {
    if (data.start && data.end) {
      return !isBefore(
        startOfDay(new Date(data.end)),
        startOfDay(new Date(data.start))
      );
    }
    return true;
  },
  {
    message: `You can't select end date which is before or the same as start date.`,
    path: ['end']
  }
).refine(
  (data) => {
    return data.type === RequestType.Vacation
      ? differenceInBusinessDays(
          startOfDay(new Date(data.end)),
          startOfDay(new Date(data.start))
        ) >= 1
      : true;
  },
  {
    message: `You should select at least one day for vacation.`,
    path: ['end']
  }
);

export const RequestCreateInput = object({
  start: string(),
  end: string(),
  projects: array(string()).nonempty({
    message: 'You should pick at least one project'
  }),
  message: string().optional(),
  type: nativeEnum(RequestType)
});
