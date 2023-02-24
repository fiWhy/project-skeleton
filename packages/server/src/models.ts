import type { CallbackFormData } from '@dot/models';
import type { ZodOptional, ZodString } from 'zod';
import { nativeEnum, object, string } from 'zod';
import { RequestRole } from '@dot/models';
import { RequestStatusType } from '@prisma/client';

export const CallbackFormPayload = object<
  Record<keyof CallbackFormData, ZodString | ZodOptional<ZodString>>
>({
  name: string(),
  email: string(),
  mobile: string(),
  company: string().optional()
});

export const IdTokenPayload = object({
  code: string()
});

export const RefreshTokenPayload = object({
  refreshToken: string()
});

export const RequestsPayload = object({
  role: nativeEnum(RequestRole).optional()
});

export const RequestApprovePayaload = object({
  id: string(),
  status: nativeEnum(RequestStatusType)
});

export const RequestDetailsPayload = object({
  id: string()
});

export const ProjectDetailsPayload = object({
  id: string()
});

export const UserDetailsPayload = object({
  id: string().optional()
});

export const TeamDetailsPayload = object({
  id: string()
});

export const ListPayload = object({
  search: string().optional()
}).optional();

export const UsersListPayload = ListPayload;
