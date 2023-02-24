export enum Role {
  QA = 'QA',
  Manager = 'Manager',
  CTO = 'CTO',
  CEO = 'CEO',
  Engineer = 'Engineer',
  Client = 'Client'
}

export enum RequestRole {
  Personal = 'Sender',
  Receiver = 'Receiver'
}

export enum RequesterRole {
  Owner = 'Owner',
  Addressee = 'Addressee'
}

export const adminRoles = [Role.CTO, Role.CEO];
export const managerRoles = [...adminRoles, Role.Manager];
