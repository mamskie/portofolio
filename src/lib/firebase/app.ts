import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

const config = getFirebaseConfig();
const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];

// Optional: Initialize Analytics only if supported (e.g. in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== 'undefined') {
  void isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
export const db = getFirestore(app);
