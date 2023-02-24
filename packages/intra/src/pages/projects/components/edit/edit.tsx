import { Autosuggestion } from '#~/components/autosuggestion/index.js';
import type { ReactElement } from 'react';
import { useLogic } from './hooks/index.js';
import type { User } from '@prisma/client';
import { first } from 'lodash-es';
import { Textarea } from '@dot/ui';

/**
 * `<Edit>` component.
 */
export const Edit = (): ReactElement => {
  const { project, isEdit, formik } = useLogic();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <h2>
          Project {isEdit ? `${project?.name ?? ''} editing` : 'creation'}
        </h2>
      </div>
      <div className="mt-16">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Project name</span>
            </label>
            <input
              required
              className="invalid:border-red-500 input-bordered input"
              placeholder="Project name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.name}
              </p>
            ) : null}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Owner</span>
            </label>
            <Autosuggestion<User>
              path="users.list"
              fields={{
                label: 'name',
                value: 'email'
              }}
              multiple={false}
              name="ownerValue"
              onChange={formik.handleChange}
              value={formik.values.ownerValue}
              onSuggest={(values): void => {
                console.log(values);
                void formik.setFieldValue('owner', first(values));
              }}
              placeholder="Type the owner's email"
              selected={[formik.values.owner]}
              className="invalid:border-red-500 input-bordered input"
            />
            {formik.errors.owner ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.owner}
              </p>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Manager</span>
            </label>
            <Autosuggestion<User>
              path="users.list"
              fields={{
                label: 'name',
                value: 'email'
              }}
              placeholder="Type the manager's email"
              multiple={false}
              name="managerValue"
              onChange={formik.handleChange}
              value={formik.values.managerValue}
              onSuggest={(values): void => {
                console.log(values);
                void formik.setFieldValue('manager', first(values));
              }}
              selected={[formik.values.manager]}
              className="invalid:border-red-500 input-bordered input"
            />
            {formik.errors.manager ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.manager}
              </p>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Description</span>
            </label>
            <Textarea
              name="description"
              placeholder="Description..."
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.manager ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.manager}
              </p>
            ) : null}
          </div>

          <div className="form-control w-full max-w-xs">
            <button
              disabled={!!Object.keys(formik.errors).length}
              className="btn-primary btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
