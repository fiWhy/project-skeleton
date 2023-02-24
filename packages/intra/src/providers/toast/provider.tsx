import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { useState, useCallback, useRef, useMemo } from 'react';
import { Context } from './context.js';
import type { Props, Toast } from './types.js';
import { ToastType } from './types.js';

/** `<Provider/>` component. */
export const Provider = ({ children, delay }: Props): ReactElement => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleToastCreate = useCallback(
    (type: ToastType) => (content: string, title?: string) => {
      setToasts((prev) => {
        const newToast = {
          type,
          title,
          content
        };

        return [...prev, newToast];
      });

      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setToasts([]);
      }, delay);
    },
    [delay]
  );

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          success: handleToastCreate(ToastType.Success),
          warn: handleToastCreate(ToastType.Warn),
          error: handleToastCreate(ToastType.Error),
          info: handleToastCreate(ToastType.Info)
        }),
        [handleToastCreate]
      )}
    >
      {children}
      <div className="toast-end toast toast-top">
        {toasts.map(({ title, type, content }, idx) => (
          <div
            key={`toast-${idx}`}
            className={clsx('alert', {
              [`alert-${type}`]: true
            })}
          >
            <div className="flex flex-col">
              {!!title && <span>{title}</span>}
              <span>{content}</span>
            </div>
          </div>
        ))}
      </div>
    </Context.Provider>
  );
};
