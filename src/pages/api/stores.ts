import { StoreType } from '@/interface';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>,
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany();

  res.status(200).json(stores);
}
