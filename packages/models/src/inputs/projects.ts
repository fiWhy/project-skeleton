import { object, string } from 'zod';

export const ProjectInput = object({
  name: string(),
  owner: string(),
  manager: string(),
  description: string()
});

export const ProjectCreateInput = ProjectInput;
export const ProjectEditInput = ProjectInput.extend({
  id: string()
});
