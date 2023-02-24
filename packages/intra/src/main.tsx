import { AuthProvider } from '@dot/auth';
import Provider from '@dot/i18n';
import { QueryProvider } from '@dot/query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '#~/app/index.js';

import '#styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router.js';
import { ToastProvider } from './providers/index.js';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider delay={3000}>
        <AuthProvider clientId={import.meta.env.DOT_CLIENT_ID}>
          <Provider>
            <QueryProvider link={import.meta.env.DOT_API_URL}>
              <App>
                <Router />
              </App>
            </QueryProvider>
          </Provider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
