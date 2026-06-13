import type {
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore';

export type PortfolioType =
  | 'experience'
  | 'education'
  | 'project'
  | 'training';

export type Portfolio = {
  id: string;
  type: PortfolioType;
  title: string;
  role: string;
  location: string;
  companyUrl?: string;
  startDate: string;
  endDate: string;
  descriptions: string[];
  order: number;
  createdAt?: Timestamp;
};

export const portfolioConverter: FirestoreDataConverter<Portfolio> = {
  toFirestore(portfolio) {
    return portfolio;
  },

  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return {
      id,
      ...data
    } as Portfolio;
  }
};