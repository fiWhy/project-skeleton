import type { Nullable } from '@dot-tools/types';

export interface InnerContextProps {
  errors: Error[];
  reset: () => void;
  getVisited: () => Nullable<string>;
  updateVisited: (url: Nullable<string>) => void;
}
