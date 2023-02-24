import { emailConfig } from '#~/constants.js';
import type { MainProps } from '#~/templates/index.js';
import { main, people } from '#~/templates/index.js';
import type { Options } from '@dot/services';
import { send } from '@dot/services';
import type { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { render } from 'ejs';

/**
 * @param options - Email options.
 * @param data - Mail template data.
 * @returns Email response.
 */
export const sendInfo = (
  options: Pick<Options, 'from' | 'to' | 'cc' | 'subject'>,
  data: MainProps
): Promise<unknown> => {
  return send({
    attachments: [
      {
        filename: 'people.png',
        encoding: 'base64',
        content: Buffer.from(people.split('base64,')[1], 'base64'),
        cid: 'header-image'
      }
    ],
    ...options,
    html: render(main, data)
  });
};

/**
 * @param request - Created request.
 * @param cc - Who should read this email too.
 * @returns Email response.
 */
export const sendVacationRequest = (
  request: Prisma.RequestGetPayload<{
    include: {
      sender: true;
    };
  }>,
  cc: string[]
): Promise<unknown> => {
  return sendInfo(
    {
      from: request.sender.email,
      to: emailConfig.mailboxes.info,
      subject: `Vacation Request from ${request.sender.name}`,
      cc
    },
    {
      subject: 'Vacation Request',
      title: `Vacation Request from ${request.sender.name}`,
      content: `
        ${request.sender.name} (${
        request.sender.email
      }) is asking for vacation from ${format(
        request.start,
        'yyyy-MM-dd'
      )} to ${format(request.start, 'yyyy-MM-dd')}. 
        Please go to the project and approve it!
      `,
      buttons: [
        {
          href: `${process.env.DOT_REDIRECT_URI!}/requests/${request.id}`,
          text: 'Check Request'
        }
      ]
    }
  );
};

/**
 * @param request - Created report.
 * @param cc - Who should read this email too.
 * @returns Email response.
 */
export const sendReport = (
  request: Prisma.RequestGetPayload<{
    include: {
      sender: true;
    };
  }>,
  cc: string[]
): Promise<unknown> => {
  return sendInfo(
    {
      from: request.sender.email,
      to: emailConfig.mailboxes.info,
      subject: `Report from ${request.sender.name}`,
      cc
    },
    {
      subject: 'Report',
      title: `Report from ${request.sender.name}`,
      content: `
        ${request.sender.name} (${
        request.sender.email
      }) published his work report ${format(
        request.start,
        'yyyy-MM-dd'
      )} to ${format(request.start, 'yyyy-MM-dd')}. 
        Please check it!
      `,
      buttons: [
        {
          href: `${process.env.DOT_REDIRECT_URI!}/requests/${request.id}`,
          text: 'Check Report'
        }
      ]
    }
  );
};
