import type { Nullable, WithChildren } from '@dot-tools/types';
import { useAuth } from '@dot/auth';
import { useLocalStorage } from '@mantine/hooks';
import type { ReactElement } from 'react';
import { visitedUrlKey } from './constants.js';
import { QueryProviderPlain } from './query-provider-plain.js';

/**
 * `<QueryProvider />` component.
 */
export const QueryProvider = ({
  link,
  children,
  onError
}: WithChildren<{
  link: string;
  onError?: (error: Error[]) => void;
}>): ReactElement => {
  const { updateUserCredentials } = useAuth();
  const [, setVisitedUrl] = useLocalStorage<Nullable<string>>({
    key: visitedUrlKey,
    defaultValue: ''
  });

  return (
    <QueryProviderPlain
      link={link}
      onError={onError}
      afterRequestActions={[
        (response: Response): void => {
          if (response.status === 401) {
            setVisitedUrl(window.location.href);
            updateUserCredentials(null);
          }
        }
      ]}
    >
      {children}
    </QueryProviderPlain>
  );
};
