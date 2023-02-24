import { adapt } from '#~/utils/date.js';
import { RequestRole } from '@dot/models';
import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useLogic } from './hooks/index.js';
import { routes } from '../../routes.js';
import { routes as usersRoutes } from '#~/pages/users//index.js';
import { last } from 'lodash-es';

/**
 * `<List>` component.
 */
export const List = (): ReactElement => {
  const { requests, setRole, role } = useLogic();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <h2>Requests</h2>
        <div className="flex w-full flex-row">
          <div className="btn-group btn-group-vertical w-full flex-1 lg:btn-group-horizontal">
            <button
              className={clsx('btn', {
                'btn-active': role === RequestRole.Personal
              })}
              onClick={(): void => setRole(RequestRole.Personal)}
            >
              Requested
            </button>
            <button
              className={clsx('btn', {
                'btn-active': role === RequestRole.Receiver
              })}
              onClick={(): void => setRole(RequestRole.Receiver)}
            >
              Received
            </button>
          </div>
          <div>
            <Link to={routes.create.getPath()} relative="path">
              <button
                className="btn btn-primary btn-active"
                onClick={(): void => setRole(RequestRole.Receiver)}
              >
                Create
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>
                  <Link
                    className="link"
                    to={routes.details.getPath(request.id)}
                    relative="path"
                  >
                    {request.id}
                  </Link>
                </td>
                <td>
                  <Link
                    className="link"
                    to={usersRoutes.detailsById.getDirectPath(request.senderId)}
                  >
                    {request.sender.name}
                  </Link>
                </td>
                <td>
                  {!!request.receiver ? (
                    <Link
                      className="link"
                      to={usersRoutes.detailsById.getDirectPath(
                        request.receiver.id
                      )}
                    >
                      {request.receiver.name}
                    </Link>
                  ) : (
                    'Non-target'
                  )}
                </td>
                <td>{request.type}</td>
                <td>{adapt(request.start)}</td>
                <td>{adapt(request.end)}</td>
                <td>{last(request.statuses)?.status ?? 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
