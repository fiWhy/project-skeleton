import { google } from 'googleapis';
import { getEnvVariable } from './utils.js';
import MailComposer from 'nodemailer/lib/mail-composer';
import type Mail from 'nodemailer/lib/mailer/index.js';

export const authConfig = {
  user: getEnvVariable('DOT_WORKSPACE_USER'),
  clientId: getEnvVariable('DOT_CLIENT_ID'),
  clientSecret: getEnvVariable('DOT_CLIENT_SECRET'),
  redirectUri: getEnvVariable('DOT_REDIRECT_URI'),
  refreshToken: getEnvVariable('DOT_REFRESH_TOKEN')
};

export const authClient = new google.auth.OAuth2(
  authConfig.clientId,
  authConfig.clientSecret,
  authConfig.redirectUri
);

authClient.setCredentials({
  refresh_token: authConfig.refreshToken
});

export const adminClient = google.admin({
  auth: authClient,
  version: 'directory_v1'
});

export const calendarClient = google.calendar({
  auth: authClient,
  version: 'v3'
});

export const mailClient = google.gmail({
  auth: authClient,
  version: 'v1'
});

export const VACATION_DAYS_PER_YEAR = 22;

export type Options = Omit<Mail.Options, 'from'> & { from: string };

const encodeMessage = (message: Buffer): string => {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const createMail = async (options: Mail.Options): Promise<string> => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

/**
 * Send email with admin rights.
 *
 * @param options - Email options.
 * @param options.from - From address.
 */
export const send = async ({ from, ...others }: Options): Promise<unknown> => {
  const msg = await createMail(others);
  return await mailClient.users.messages.send({
    userId: from,
    requestBody: {
      raw: msg
    }
  });
};
