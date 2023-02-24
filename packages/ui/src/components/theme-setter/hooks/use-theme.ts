import { Theme } from '@dot/ui/themes';
import { useEffect, useRef, useState } from 'react';
import type { Maybe } from '@dot-tools/types';

/**
 * Theme detection hook.
 *
 * @returns Theme.
 */
export const useTheme = (): Maybe<Theme> => {
  const [theme, setTheme] = useState<Maybe<Theme>>();
  const media = useRef(window.matchMedia('(prefers-color-scheme: dark)'));

  useEffect(() => {
    const currentMedia = media.current;
    const handleThemeChange = ({ matches }: MediaQueryListEvent): void => {
      setTheme(matches ? Theme.Dark : Theme.Light);
    };

    currentMedia.addEventListener('change', handleThemeChange);

    return () => {
      currentMedia.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return theme;
};
