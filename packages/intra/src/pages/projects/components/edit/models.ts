import { ProjectInput } from '@dot/models';
import { string } from 'zod';

export const ProjectFormInput = ProjectInput.extend({
  ownerValue: string().optional(),
  managerValue: string().optional()
});
