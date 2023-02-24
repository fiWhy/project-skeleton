import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Provider from '@dot/i18n';

import { App } from '#~/app/index.js';

import '#styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router.js';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <App>
          <Router />
        </App>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
