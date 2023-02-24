import { defaultImport } from 'default-import';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import {
  I18nextProvider,
  initReactI18next,
  useTranslation
} from 'react-i18next';

const i18nExport = defaultImport(i18n);

import * as resources from './translations/index.js';

/**
 * `<Provider>` component.
 */
export default ({ children }: PropsWithChildren): ReactElement | null => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    i18nExport
      .use(initReactI18next)
      .use(defaultImport(LanguageDetector))
      .init({
        ns: 'common',
        fallbackLng: 'en',
        resources
      })
      .then(() => {
        setIsReady(true);
      })
      .catch((error: string) => {
        console.log('Error during loading i18n', error);
      });
  });

  return isReady ? (
    <I18nextProvider i18n={i18nExport}>{children}</I18nextProvider>
  ) : null;
};

export { useTranslation };
