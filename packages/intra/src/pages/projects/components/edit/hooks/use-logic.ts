import { useToast } from '#~/providers/index.js';
import type { Maybe } from '@dot-tools/types';
import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import type { Project } from '@prisma/client';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type zod from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { routes } from '../../../routes.js';
import { ProjectFormInput } from '../models.js';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  project: Maybe<FromAppRouter['projects']['details']>;
  formik: ReturnType<typeof useFormik<zod.infer<typeof ProjectFormInput>>>;
  isEdit: boolean;
} => {
  const { id } = useParams<{ id: string }>();
  const { success } = useToast();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { data } = request.projects.details.useQuery(
    {
      id: id!
    },
    {
      enabled: isEdit
    }
  );

  const handleMutationSuccess = useCallback(
    (data: Project) => {
      success(
        `Project ${data.name} was successfully ${
          isEdit ? 'updated' : 'created'
        }!`
      );
      if (!isEdit) navigate(routes.details.getDirectPath(data.id));
    },
    [navigate, success, isEdit]
  );

  const { mutate: create } = request.projects.create.useMutation({
    onSuccess: handleMutationSuccess
  });
  const { mutate: edit } = request.projects.edit.useMutation({
    onSuccess: handleMutationSuccess
  });

  const formik = useFormik<zod.infer<typeof ProjectFormInput>>({
    validationSchema: toFormikValidationSchema(ProjectFormInput),
    enableReinitialize: true,
    initialValues: {
      name: '',
      manager: '',
      owner: '',
      ownerValue: '',
      managerValue: '',
      description: ''
    },
    onSubmit: (data) => {
      if (id) {
        edit({
          id,
          ...data
        });
      } else {
        create(data);
      }
    }
  });

  const { setValues } = formik;

  useEffect(() => {
    if (!data) return;

    void setValues({
      name: data.name,
      manager: data.manager.email,
      owner: data.owner.email,
      ownerValue: '',
      managerValue: '',
      description: data.description
    });
  }, [data, setValues]);

  return {
    project: data,
    formik,
    isEdit: !!id
  };
};
