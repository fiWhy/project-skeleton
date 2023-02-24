import { array, map, nativeEnum, object, string } from 'zod';
import { Role } from '../enums.js';

export const TeamInput = object({
  name: string(),
  members: map(string(), array(nativeEnum(Role)))
});

export const TeamFormInput = object({
  name: string(),
  members: array(
    object({
      email: array(string()),
      roles: array(nativeEnum(Role))
    })
  )
});

export const TeamCreateInput = TeamInput;
export const TeamEditInput = TeamInput.extend({
  id: string()
});
