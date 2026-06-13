import { getServerSession } from 'next-auth';
import { addDoc, getDocs, orderBy, query } from 'firebase/firestore';

import { portfolioCollection } from '@lib/firebase/collections';
import { authOptions } from '../auth/[...nextauth]';

import type { AuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';
import type { CustomSession } from '@lib/types/api';
import type { Portfolio } from '@lib/types/portfolio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Portfolio | Portfolio[]>>
): Promise<void> {
  try {
    if (req.method === 'GET') {
      const snapshot = await getDocs(
        query(portfolioCollection, orderBy('order', 'asc'))
      );

      const portfolio = snapshot.docs.map((doc) => doc.data());

      return res.status(200).json(portfolio);
    }

    if (req.method === 'POST') {
      const session = await getServerSession<AuthOptions, CustomSession>(
        req,
        res,
        authOptions
      );

      if (!session?.user?.admin) {
        return res.status(403).json({
          message: 'Forbidden'
        });
      }

      const data = req.body as Omit<Portfolio, 'id'>;

      const docRef = await addDoc(
        portfolioCollection,
        data
      );

      return res.status(201).json({
        ...data,
        id: docRef.id
      } as Portfolio);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: 'Internal server error'
    });
  }

  return res.status(405).json({
    message: 'Method not allowed'
  });
}