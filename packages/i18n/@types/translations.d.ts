import type { en } from '../src/translations/index.js';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: Record<'ua' | 'sl' | 'en', typeof en>;
  }
}
