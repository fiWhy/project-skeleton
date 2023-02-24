import { RequestType } from '@prisma/client';
import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import { useLogic } from './hooks/index.js';

/**
 * `<Edit>` component.
 */
export const Edit = (): ReactElement => {
  const { formik, isEdit, user, onPickProject } = useLogic();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <h2>Request {isEdit ? 'editing' : 'creation'}</h2>
      </div>
      <div className="mt-16">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="type">
              <span className="label-text">Pick the type of request</span>
            </label>
            <select
              className="select-bordered select"
              id="type"
              name="type"
              required
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              {Object.values(RequestType).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="type">
              <span className="label-text">Pick the project</span>
            </label>
            <div>
              {user?.projects.map((project) => (
                <div
                  key={project.id}
                  onClick={onPickProject(project.id)}
                  className={clsx('badge cursor-pointer', {
                    'badge-primary': formik.values.projects.includes(project.id)
                  })}
                >
                  {project.name}
                </div>
              ))}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="start">
              <span className="label-text">First day</span>
            </label>
            <input
              required
              className="invalid:border-red-500 input-bordered input"
              placeholder="Message"
              type="date"
              id="start"
              name="start"
              onChange={formik.handleChange}
              value={formik.values.start}
            />
            {formik.errors.start ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.start}
              </p>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="end">
              <span className="label-text">Last day</span>
            </label>
            <input
              required
              className="input-bordered input"
              placeholder="Message"
              type="date"
              id="end"
              name="end"
              disabled={!formik.values.start}
              onChange={formik.handleChange}
              value={formik.values.end}
            />
            {formik.errors.end ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.end}
              </p>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="message">
              <span className="label-text">Leave your message</span>
            </label>
            <textarea
              className="textarea-bordered textarea h-24"
              placeholder="Message"
              id="message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>
            {formik.errors.message ? (
              <p className="text-red mt-2 text-xs italic">
                {formik.errors.message}
              </p>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <button
              disabled={!!Object.keys(formik.errors).length}
              className="btn btn-primary"
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
