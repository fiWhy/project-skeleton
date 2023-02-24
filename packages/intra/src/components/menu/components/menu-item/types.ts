import type { Maybe } from '@dot-tools/types';
import type { NavLinkProps } from 'react-router-dom';

export type Props = NavLinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    action?: Maybe<() => void>;
  };
