import { useCallback, useEffect, useRef } from 'react';
import type { Return } from './types.js';

/**
 * Interval hook.
 *
 * @param cb - Interval callback.
 * @param delay - Interval delay.
 * @returns Control functions.
 */
export const useInterval = (cb: () => void, delay: number): Return => {
  const intervalCallback = useRef<() => void>();
  const intervalId = useRef<NodeJS.Timer>();

  const handleStopInterval = useCallback((): void => {
    clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    intervalCallback.current = cb;
  }, [cb, handleStopInterval]);

  return {
    start: useCallback(() => {
      handleStopInterval();
      intervalId.current = setInterval(() => {
        intervalCallback.current?.();
      }, delay);
    }, [delay, handleStopInterval]),
    stop: handleStopInterval
  };
};
