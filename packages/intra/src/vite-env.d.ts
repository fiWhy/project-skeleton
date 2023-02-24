/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DOT_API_URL: string;
  readonly DOT_CLIENT_ID: string;
  readonly DOT_HOSTED_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
