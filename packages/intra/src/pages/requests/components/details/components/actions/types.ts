import type { Maybe } from '@dot-tools/types';
import type { FromAppRouter } from '@dot/server';
import type { RequestStatusType } from '@prisma/client';

export interface Props {
  request?: Maybe<FromAppRouter['requests']['details']>;
  currentStatus?: RequestStatusType;
  onChangeStatus: (status: RequestStatusType) => void;
  isLoading: boolean;
}
