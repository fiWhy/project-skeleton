import type { Maybe } from '@dot-tools/types';
import type { AutosuggestProps, Suggestion } from '@dot/ui';

export interface Fields<T> {
  label: keyof T;
  value: keyof T;
}

export type Props<T> = Omit<
  AutosuggestProps,
  'onSuggest' | 'selected' | 'onSearch' | 'suggestions'
> & {
  path: string;
  fields: Fields<T>;
  selected: string[];
  onSuggest: (value: string[]) => void;
  suggestionsProcessor?: Maybe<(suggestions: Suggestion[]) => Suggestion[]>;
};
