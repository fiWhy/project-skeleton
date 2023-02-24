import type { ReactElement } from 'react';
import { Actions, Stats } from './components/index.js';
import { useLogic } from './hooks/index.js';

/**
 * `<Details>` component.
 */
export const Details = (): ReactElement => {
  const { request, changeStatus, status, isResolver, isResolving } = useLogic();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-1">
          <h2>Request</h2>
        </div>
        {isResolver &&
          request?.start &&
          new Date(request.start) > new Date() && (
            <Actions
              request={request}
              currentStatus={status}
              onChangeStatus={changeStatus}
              isLoading={isResolving}
            />
          )}
      </div>
      <div>{!!request && <Stats request={request} />}</div>
      <div className="mt-16">{request?.message ?? 'No message'}</div>
    </div>
  );
};

export default Details;
