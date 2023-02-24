import { PrismaClient } from '@prisma/client';

const env = process.env as Record<string, string>;

export const prisma = new PrismaClient({
  log: env.ENV === 'development' ? ['query', 'info', 'warn', 'error'] : []
});
