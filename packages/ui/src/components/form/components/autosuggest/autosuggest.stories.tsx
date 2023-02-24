import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Autosuggest } from './index.js';
import { useCallback, useState, useEffect } from 'react';
import type { Suggestion } from './types.js';
import { useDebouncedState } from '@mantine/hooks';

const defaultValues: Suggestion[] = Array(10)
  .fill(1)
  .map((_, idx) => ({
    label: `Test User ${idx}`,
    value: String(idx)
  }));

export const Primary: ComponentStory<typeof Autosuggest> = (args) => {
  const [search, setSearch] = useDebouncedState<string>('', 200);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion[]>([]);

  const handleSearch = useCallback(() => {
    if (search.length > 2) {
      setSuggestions(
        defaultValues.filter((v) => v.label.match(new RegExp(search, 'i')))
      );
    }
  }, [search]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Autosuggest
      {...args}
      onSuggest={setSelected}
      selected={selected}
      onSearch={setSearch}
      suggestions={suggestions}
    />
  );
};

Primary.args = {};

export default {
  component: Autosuggest,
  title: 'Pure/Form/Autosuggest',
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  },
  args: {
    disabled: false
  }
} as ComponentMeta<typeof Autosuggest>;

Primary.storyName = 'Primary';
