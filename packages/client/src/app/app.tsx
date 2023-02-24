import type { ChildrenOnly } from '@dot-tools/types';
import { QueryProviderPlain } from '@dot/query';
import { ThemeSetter, useTheme } from '@dot/ui';
import { Theme } from '@dot/ui/themes';
import type { ReactElement } from 'react';

/**
 * @returns React element.
 */
export const App = ({ children }: ChildrenOnly): ReactElement => {
  const theme = useTheme();

  return (
    <QueryProviderPlain link={import.meta.env.DOT_API_URL}>
      <ThemeSetter theme={theme ?? Theme.Dark} />
      <div className="flex h-full flex-col">{children}</div>
    </QueryProviderPlain>
  );
};
