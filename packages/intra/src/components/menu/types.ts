import type { Maybe, Nullable } from '@dot-tools/types';

export interface MenuItem {
  label: string;
  to?: Maybe<string>;
  action?: Maybe<() => void>;
}

export interface Props {
  picture?: Nullable<Maybe<string>>;
  items?: MenuItem[];
  dropdownItems?: MenuItem[];
}
