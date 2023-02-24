import { request } from '@dot/query';
import type { Suggestion } from '@dot/ui';
import { useDebouncedState } from '@mantine/hooks';

/**
 * Logic hook.
 *
 * @param path - Request path.
 * @param fields - Fields to be parsed from returned data as suggestion.
 * @param fields.label - Label field.
 * @param fields.value - Value field.
 * @returns Calculation values.
 */
export const useLogic = <T>(
  path: string,
  fields: {
    label: keyof T;
    value: keyof T;
  }
): {
  suggestions: Suggestion[];
  onSearch: (value: string) => void;
} => {
  const [search, setSearch] = useDebouncedState<string>('', 200);

  const { data = [] } = (
    request as unknown as Record<
      string,
      {
        useQuery: (
          opts: Record<string, string>,
          params: {
            enabled: boolean;
          }
        ) => {
          data: T[] | undefined;
        };
      }
    >
  )[path].useQuery(
    {
      search: search
    },
    {
      enabled: search.length > 2
    }
  );

  return {
    suggestions: data.map((item) => ({
      label: item[fields.label] as string,
      value: item[fields.value] as string
    })),
    onSearch: setSearch
  };
};
