import { Footer, Header } from '#~/components/index.js';
import type { ChildrenOnly } from '@dot-tools/types';
import { ThemeSetter } from '@dot/ui';
import { Theme } from '@dot/ui/themes';
import type { ReactElement } from 'react';
import { useLogic } from './hooks/index.js';

/**
 * @returns React element.
 */
export const App = ({ children }: ChildrenOnly): ReactElement => {
  const { userCredentials, theme } = useLogic();

  return (
    <div className="container mx-auto flex h-full flex-col p-4">
      <ThemeSetter theme={theme ?? Theme.Dark} />
      {userCredentials ? <Header className="flex" /> : null}
      <div className="flex flex-1 flex-col">{children}</div>
      {userCredentials ? <Footer /> : null}
    </div>
  );
};
