import { getEnvVariable } from '@dot/services';
import type { calendar_v3 } from 'googleapis';

export const workspaceData = {
  calendars: {
    pto: 'c_e5cb0fbc03c4ef40d0ba3ff70f6d8a0805ae953174bbe61f7a19b488de93526d@group.calendar.google.com'
  }
};

export const VACATION_DAYS_PER_YEAR = 22;

export const emailConfig = {
  mailboxes: {
    info: getEnvVariable('DOT_WORKSPACE_INFO'),
    admin: getEnvVariable('DOT_WORKSPACE_USER')
  }
};

export const events: Record<
  string,
  (
    start: Date,
    end: Date,
    creator: calendar_v3.Schema$Event['creator']
  ) => calendar_v3.Schema$Event
> = {
  pto: (
    start: Date,
    end: Date,
    creator: calendar_v3.Schema$Event['creator']
  ) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const author = `${creator?.displayName ?? 'Unknown'} <${
      creator?.email ?? 'unknown'
    }>`;
    const data = {
      summary: `${author} PTO`,
      description: `PTO days reservation for ${author}`,
      creator,
      start: {
        dateTime: start.toISOString(),
        timeZone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone
      },
      eventType: 'outOfOffice'
    };

    console.log(data);
    return data;
  }
};
