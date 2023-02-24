import { Footer, Header } from '#~/components/index.js';
import type { ReactElement } from 'react';

/**
 * `<Main>` component.
 */
export const Home = (): ReactElement => {
  return (
    <>
      <Header className="bg-natural-yellow" />
      <div className="mt-40 h-full flex-1">Welcome</div>
      <Footer />
    </>
  );
};
