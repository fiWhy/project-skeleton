import type { Maybe } from '@dot-tools/types';
import type { InputHTMLAttributes } from 'react';

export type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  withError?: Maybe<boolean>;
};
