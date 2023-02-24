export type InputWithoutDefaults<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
