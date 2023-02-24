import type { ReactElement } from 'react';
import { useEffect } from 'react';
import type { Props } from './types.js';

/** `<ThemeSetter>` component. */
export const ThemeSetter = ({ children, theme }: Props): ReactElement => {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <>{children}</>;
};
