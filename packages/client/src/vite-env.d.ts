/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DOT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
