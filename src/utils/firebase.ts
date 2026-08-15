import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID
} = import.meta.env;

/**
 * Firebase is OPTIONAL and used ONLY for real package tracking (+ activity sync).
 * Without env vars the site runs fully on local mock data.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    VITE_FIREBASE_API_KEY &&
    VITE_FIREBASE_PROJECT_ID &&
    VITE_FIREBASE_APP_ID
  );
}

let dbInstance: ReturnType<typeof getFirestore> | null = null;
let authInstance: ReturnType<typeof getAuth> | null = null;

export function getDb() {
  if (!isFirebaseConfigured()) return null;
  if (!dbInstance) {
    const app = getApps().length
      ? getApps()[0]
      : initializeApp({
          apiKey: VITE_FIREBASE_API_KEY,
          authDomain: VITE_FIREBASE_AUTH_DOMAIN,
          projectId: VITE_FIREBASE_PROJECT_ID,
          storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: VITE_FIREBASE_APP_ID
        });
    dbInstance = getFirestore(app);
  }
  return dbInstance;
}

export function getAuthInstance() {
  if (!isFirebaseConfigured()) return null;
  if (!authInstance) {
    getDb(); // ensures the app is initialized
    authInstance = getAuth(getApps()[0]);
  }
  return authInstance;
}

/** Race a promise against a timeout so a misconfigured project never hangs the UI. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}
