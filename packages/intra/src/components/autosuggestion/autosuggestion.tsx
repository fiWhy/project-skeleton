import type { Suggestion } from '@dot/ui';
import { Autosuggest } from '@dot/ui';
import type { ReactElement } from 'react';
import type { Props } from './types.js';
import { useLogic } from './hooks/index.js';
import { map } from 'lodash-es';
import { useCallback } from 'react';

/**
 * `<Autosuggestion />` component.
 */
export const Autosuggestion = <T,>({
  className,
  path,
  fields,
  onSuggest,
  selected,
  suggestionsProcessor,
  ...props
}: Props<T>): ReactElement => {
  const { onSearch, suggestions } = useLogic<T>(path, fields);

  const handleSelect = useCallback(
    (suggestions: Suggestion[]): void => {
      onSuggest(map(suggestions, 'value'));
    },
    [onSuggest]
  );

  const actuallySelected = selected.length
    ? selected.map((item) => ({ label: item, value: item }))
    : suggestions.filter((suggestion) => selected.includes(suggestion.value));

  return (
    <Autosuggest
      {...props}
      className={className}
      onSuggest={handleSelect}
      selected={actuallySelected.filter((v) => !!v.value)}
      onSearch={onSearch}
      suggestions={
        suggestionsProcessor ? suggestionsProcessor(suggestions) : suggestions
      }
    />
  );
};
