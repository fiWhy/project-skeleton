import { RequestStatusType, RequestType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { getVacationDaysRemain } from './users.js';

describe('users', () => {
  describe('getVacationDaysRemain', () => {
    it('should calculate vacation days', () => {
      expect(
        getVacationDaysRemain(
          {
            id: 'abc',
            name: 'Test user',
            email: 'test.user@email.com',
            refresh: null,
            picture: null,
            startFrom: new Date(2022, 10, 7),
            createdAt: new Date(2022, 11, 7),
            updatedAt: new Date(2022, 11, 7)
          },
          [
            {
              id: '1',
              message: '',
              senderId: 'abc',
              receiverId: null,
              eventId: '123',
              statuses: [
                {
                  status: RequestStatusType.Resolved,
                  requestId: '1',
                  id: '567',
                  resolverId: '123',
                  createdAt: new Date(2022, 10, 7),
                  updatedAt: new Date(2022, 10, 7)
                }
              ],
              type: RequestType.Vacation,
              start: new Date(2022, 11, 27),
              end: new Date(2022, 11, 28),
              createdAt: new Date(2022, 10, 7),
              updatedAt: new Date(2022, 10, 7)
            },
            {
              id: '2',
              message: '',
              senderId: 'abc',
              eventId: '321',
              statuses: [
                {
                  status: RequestStatusType.Resolved,
                  requestId: '2',
                  id: '5678',
                  createdAt: new Date(2022, 10, 7),
                  updatedAt: new Date(2022, 10, 7),
                  resolverId: '123'
                }
              ],
              receiverId: null,
              type: RequestType.Vacation,
              start: new Date(2023, 0, 19),
              end: new Date(2023, 0, 21),
              createdAt: new Date(2022, 10, 7),
              updatedAt: new Date(2022, 10, 7)
            }
          ],
          22
        )
      ).toBe(2);
    });
  });
});
