import type { WithChildren } from '@dot-tools/types';

type ToastCallback = (content: string, title?: string) => void;

export interface ContextProps {
  error: ToastCallback;
  info: ToastCallback;
  warn: ToastCallback;
  success: ToastCallback;
}

export type Props = WithChildren<{
  delay: number;
}>;

export enum ToastType {
  Info = 'info',
  Error = 'error',
  Warn = 'warning',
  Success = 'success'
}

export interface Toast {
  type: ToastType;
  title?: string;
  content: string;
}
