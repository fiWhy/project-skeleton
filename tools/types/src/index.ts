import type { PropsWithChildren, HTMLAttributes } from 'react';

export type Maybe<T> = T | undefined;

export type Nullable<T> = T | null;

export type ChildrenOnly = Pick<PropsWithChildren, 'children'>;

export type WithChildren<T> = PropsWithChildren<T>;

export type NoChildren<T> = T;

export type Attributes<T extends HTMLElement> = HTMLAttributes<T>;
