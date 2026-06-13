import { getServerSession } from 'next-auth';
import {
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import { portfolioCollection } from '@lib/firebase/collections';
import { authOptions } from '../auth/[...nextauth]';

import type { AuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';
import type { CustomSession } from '@lib/types/api';
import type { Portfolio } from '@lib/types/portfolio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
): Promise<void> {
  try {
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

    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({
        message: 'Invalid id'
      });
    }

    const ref = doc(
      portfolioCollection,
      id
    );

    if (req.method === 'PATCH') {
      const data = req.body as Partial<Portfolio>;

      await updateDoc(ref, data);

      return res.status(200).json({
        message: 'Updated successfully'
      });
    }

    if (req.method === 'DELETE') {
      await deleteDoc(ref);

      return res.status(200).json({
        message: 'Deleted successfully'
      });
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