import { routes as rootRoutes } from '#~/constants/index.js';
import { useToast } from '#~/providers/index.js';
import { dateToCalendarString } from '#~/utils/date.js';
import type { Maybe } from '@dot-tools/types';
import { useUser } from '@dot/auth';
import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { RequestType } from '@prisma/client';
import { differenceInBusinessDays, startOfWeek } from 'date-fns/esm';
import { useFormik } from 'formik';
import { map } from 'lodash-es';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { routes as requestsRoutes } from '../../../routes.js';
import { RequestInput } from '@dot/models';
import type { FormValues } from '../types.js';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  request: Maybe<FromAppRouter['requests']['details']>;
  isEdit: boolean;
  onPickProject: (id: string) => () => void;
  user: Maybe<FromAppRouter['users']['currentUser']>;
  formik: ReturnType<typeof useFormik<FormValues>>;
  selectedBusinessDays: number;
} => {
  const user = useUser();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { id } = useParams<{ id: string }>();
  const { data } = request.requests.details.useQuery(
    {
      id: id!
    },
    {
      enabled: !!id
    }
  );
  const { data: profile } = request.users.profile.useQuery(
    {
      id: user?.id
    },
    {
      enabled: !!user
    }
  );

  const { mutate: createRequest } = request.requests.create.useMutation({
    onSuccess: ({ id }) => {
      success(`Your request ${id} has been created`);
      navigate(
        `${rootRoutes.requests.getPath()}/${requestsRoutes.details.getPath(id)}`
      );
    }
  });

  const formik = useFormik<FormValues>({
    validationSchema: toFormikValidationSchema(RequestInput),
    enableReinitialize: true,
    initialValues: {
      message: '',
      projects: map(user?.projects ?? [], 'id'),
      start: '',
      end: '',
      type: RequestType.General
    },
    onSubmit: (data) => {
      let validationError: Maybe<Error>;

      if (data.type === RequestType.Vacation) {
        const diff = Math.abs(
          differenceInBusinessDays(new Date(data.start), new Date(data.end))
        );

        if (profile && diff > profile.vacations!) {
          validationError = new Error(
            `You don't have ${diff} vacation days available`
          );
        }
      }

      if (validationError) {
        error(validationError.message);
      } else {
        createRequest({
          ...data,
          projects: data.projects as [string, ...string[]]
        });
      }
    }
  });

  const handlePickProject = useCallback(
    (id: string) => () => {
      const projectsSet = new Set(formik.values.projects);
      if (projectsSet.has(id)) {
        projectsSet.delete(id);
      } else {
        projectsSet.add(id);
      }

      void formik.setFieldValue('projects', Array.from(projectsSet));
    },
    [formik]
  );

  const selectedBusinessDays = differenceInBusinessDays(
    new Date(formik.values.start),
    new Date(formik.values.end)
  );

  const {
    setFieldValue,
    values: { type }
  } = formik;

  useEffect(() => {
    if (type === RequestType.Report) {
      void setFieldValue(
        'start',
        dateToCalendarString(startOfWeek(new Date()))
      );
      void setFieldValue('end', dateToCalendarString(new Date()));
    }
  }, [type, setFieldValue]);

  return {
    request: data,
    user: user,
    isEdit: !!id,
    formik,
    onPickProject: handlePickProject,
    selectedBusinessDays
  };
};
