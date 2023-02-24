import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Props, Suggestion } from './types.js';
import { useClickOutside } from '@mantine/hooks';

/**
 * `<Autosuggest>` component.
 */
export const Autosuggest = ({
  className,
  suggestions,
  selected,
  onSuggest,
  onSearch,
  withError,
  multiple = true,
  ...props
}: Props): ReactElement => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentSelected, setCurrentSelected] = useState<
    Map<string, Suggestion>
  >(new Map());

  const ref = useClickOutside(() => {
    setIsOpened(false);
  });

  const handleSelect = useCallback(
    (value: Suggestion) => () => {
      if (currentSelected.has(value.value)) {
        return;
      }
      onSuggest(multiple ? [...selected, value] : [value]);
    },
    [selected, onSuggest, multiple, currentSelected]
  );

  const handleRemove = useCallback(
    (value: Suggestion) => () => {
      const newSelected = new Map(currentSelected);
      newSelected.delete(value.value);

      onSuggest(Array.from(newSelected.values()));
    },
    [currentSelected, onSuggest]
  );

  useEffect(() => {
    if (!!suggestions.length) {
      setIsOpened(true);
    }
  }, [suggestions]);

  useEffect(() => {
    setCurrentSelected(
      selected.reduce((acc, next) => acc.set(next.value, next), new Map())
    );
  }, [selected]);

  return (
    <div className="dropdown dropdown-end flex flex-col" ref={ref}>
      <div
        className={twMerge(
          clsx(
            'flex h-auto w-full flex-wrap gap-2 p-4 text-sm focus-visible:outline-none',
            {
              'border-primary-red border': withError
            },

            className
          )
        )}
      >
        {selected.map((item, idx) => (
          <span
            className="badge badge-primary text-natural-white flex h-auto items-center justify-center gap-x-2 "
            key={`${item.value}-${idx}`}
          >
            {item.label}
            <span className="cursor-pointer" onClick={handleRemove(item)}>
              x
            </span>
          </span>
        ))}
        <input
          {...props}
          onClick={(e): void => {
            if (!suggestions.length) return;

            setIsOpened(true);
            props.onClick?.(e);
          }}
          onInput={(e): void => {
            onSearch(e.currentTarget.value);
            props.onInput?.(e);
          }}
          className={twMerge(
            'flex-1 bg-transparent focus:outline-none focus-visible:outline-none'
          )}
        />
      </div>
      {isOpened && (
        <div className="shadow-field text-secondary-grey-90 disabled:text-secondary-grey-70 mt-4 flex max-h-72 w-full flex-wrap gap-y-2 overflow-y-scroll rounded-md text-sm focus-visible:outline-none">
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-full shadow"
          >
            {suggestions.map((suggestion, idx) => (
              <li
                onClick={handleSelect(suggestion)}
                key={`${suggestion.value}-${idx}`}
              >
                <a
                  className={clsx({
                    'cursor-pointer': !currentSelected.has(suggestion.value),
                    active: currentSelected.has(suggestion.value)
                  })}
                >
                  {suggestion.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
