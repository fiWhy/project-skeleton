import type { ReactElement } from 'react';
import { useCallback } from 'react';
import type { Props } from './types.js';
import { RequestStatusType } from '@prisma/client';

/**
 * `<Actions />` component.
 */
export const Actions = ({
  isLoading,
  currentStatus,
  onChangeStatus
}: Props): ReactElement => {
  const handleChangeStatus = useCallback(
    (status: RequestStatusType) => () => {
      onChangeStatus(status);
    },
    [onChangeStatus]
  );
  return (
    <div>
      {!currentStatus && (
        <button
          disabled={isLoading}
          className="btn btn-error"
          onClick={handleChangeStatus(RequestStatusType.InProgress)}
        >
          I'll take it!
        </button>
      )}
      {!currentStatus ||
        (currentStatus !== RequestStatusType.Resolved && (
          <button
            disabled={isLoading}
            className="btn btn-primary"
            onClick={handleChangeStatus(RequestStatusType.Resolved)}
          >
            Approve
          </button>
        ))}
      {!currentStatus ||
        (currentStatus !== RequestStatusType.Rejected && (
          <button
            disabled={isLoading}
            className="btn btn-error"
            onClick={handleChangeStatus(RequestStatusType.Rejected)}
          >
            Reject
          </button>
        ))}
    </div>
  );
};
