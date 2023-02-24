import type { WithChildren } from '@dot-tools/types';
import { getIdToken } from '@dot/auth';
import type { AppRouter } from '@dot/server';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { TRPCClientError } from '@trpc/client';
import { httpBatchLink } from '@trpc/client';
import { flatMap } from 'lodash-es';
import type { ReactElement } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { ZodError } from 'zod';
import { visitedUrlKey } from './constants.js';
import { InnerContext } from './inner-context.js';
import { trpc } from './trpc.js';

/**
 * `<QueryProviderPlain />` component.
 */
export const QueryProviderPlain = ({
  link,
  children,
  onError,
  afterRequestActions = []
}: WithChildren<{
  link: string;
  onError?: (error: Error[]) => void;
  afterRequestActions?: ((response: Response) => void | Promise<void>)[];
}>): ReactElement => {
  const [errors, setErrors] = useState<Error[]>([]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: Error): void => {
            setErrors([error]);
            onError?.([error]);
          }
        })
      })
  );

  const handleResetStatus = useCallback(() => {
    setErrors([]);
  }, []);

  const handlePerformVisited = useCallback(() => {
    const value = localStorage.getItem(visitedUrlKey);
    if (value) {
      localStorage.removeItem(visitedUrlKey);
      window.location.href = value;
    }
  }, []);

  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: link,
          fetch: async (input, init) => {
            const response = await fetch(input, init);
            if (!response.ok) {
              const body = (await response.clone().json()) as {
                error: TRPCClientError<AppRouter> | ZodError[];
              }[];

              setErrors(
                flatMap(
                  body.map((err) => {
                    return Array.isArray(err.error)
                      ? err.error
                      : new Error(err.error.message);
                  })
                )
              );
            }

            await Promise.all(
              afterRequestActions.map(async (action) => await action(response))
            );

            return response;
          },
          headers: () => {
            const token = getIdToken();
            return {
              Authorization: token ? `Bearer ${token}` : ''
            };
          }
        })
      ]
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <InnerContext.Provider
          value={useMemo(
            () => ({
              errors,
              performVisited: handlePerformVisited,
              reset: handleResetStatus,
              getVisited: () => localStorage.getItem(visitedUrlKey),
              updateVisited: (url: string) =>
                localStorage.setItem(visitedUrlKey, url)
            }),
            [errors, handleResetStatus, handlePerformVisited]
          )}
        >
          {children}
        </InnerContext.Provider>
        {import.meta.env.DEV ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
