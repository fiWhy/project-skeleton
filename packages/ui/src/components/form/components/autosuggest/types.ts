import type { Maybe } from '@dot-tools/types';
import type { Props as InputProps } from '../input/index.js';

export interface Suggestion {
  label: string;
  value: string;
}

export type Props = InputProps & {
  onSearch: (value: string) => void;
  onSuggest: (values: Suggestion[]) => void;
  selected: Suggestion[];
  suggestions: Suggestion[];
  multiple?: Maybe<boolean>;
};
