import { Theme } from '@dot/ui/themes';
import { ThemeSetter } from '../src/components';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import './styles.css';

/** @type {import('@storybook/react').StoryMetadata['parameters']} */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  darkMode: {
    current: Theme.Dark,
    [Theme.Dark]: { ...themes.normal },
    [Theme.Light]: { ...themes.normal }
  }
};

const ThemeWrapper = ({ children }) => {
  return (
    <>
      <ThemeSetter theme={useDarkMode() ? Theme.Dark : Theme.Light} />
      {children}
    </>
  );
};

export const decorators = [(Story) => <ThemeWrapper>{Story()}</ThemeWrapper>];
