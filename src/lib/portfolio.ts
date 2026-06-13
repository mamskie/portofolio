import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';

import { portfolioCollection } from './firebase/collections';

import type { Portfolio } from './types/portfolio';

export async function getPortfolio(): Promise<Portfolio[]> {
  const portfolioSnapshot = await getDocs(
    query(portfolioCollection, orderBy('order', 'asc'))
  );

  return portfolioSnapshot.docs.map((doc) => doc.data());
}

export async function createPortfolio(
  data: Omit<Portfolio, 'id'>
) {
  return addDoc(portfolioCollection, data);
}

export async function updatePortfolio(
  id: string,
  data: Partial<Portfolio>
) {
  return updateDoc(doc(portfolioCollection, id), data);
}

export async function deletePortfolio(id: string) {
  return deleteDoc(doc(portfolioCollection, id));
}