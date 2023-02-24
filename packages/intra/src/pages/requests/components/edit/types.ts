import type { RequestType } from '@prisma/client';

export interface FormValues {
  message: string;
  type: RequestType;
  projects: string[];
  start: string;
  end: string;
}
