import { isFirebaseConfigured, getAuthInstance, getDb, withTimeout } from '../utils/firebase';

/** Fallback admin emails (always allowed even without Firestore). */
export const ADMIN_EMAILS = ['admin@fedex.com', 'adminmain@gmail.com'];

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

function friendlyError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'Authentication failed. Please try again.';
  }
}

async function firebaseAuth(): Promise<{
  createUserWithEmailAndPassword: Function;
  signInWithEmailAndPassword: Function;
  signOut: Function;
  updateProfile: Function;
} | null> {
  if (!isFirebaseConfigured()) return null;
  const auth = getAuthInstance();
  if (!auth) return null;
  return import('firebase/auth');
}

export const authService = {
  get backend(): 'firebase' | 'local' {
    return isFirebaseConfigured() ? 'firebase' : 'local';
  },

  async signUp(email: string, password: string, displayName: string): Promise<AuthUser> {
    const fb = await firebaseAuth();
    if (fb) {
      try {
        const auth = getAuthInstance()!;
        const cred = await fb.createUserWithEmailAndPassword(auth, email, password);
        await fb.updateProfile(cred.user, { displayName });
        return { uid: cred.user.uid, email, displayName: displayName || email.split('@')[0] };
      } catch (e: any) {
        throw new Error(friendlyError(e?.code || ''));
      }
    }
    // Local fallback
    await new Promise(r => setTimeout(r, 300));
    return { uid: `local-${btoa(email).slice(0, 12)}`, email, displayName: displayName || email.split('@')[0] };
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    const fb = await firebaseAuth();
    if (fb) {
      try {
        const auth = getAuthInstance()!;
        const cred = await fb.signInWithEmailAndPassword(auth, email, password);
        return {
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: cred.user.displayName || (cred.user.email || email).split('@')[0]
        };
      } catch (e: any) {
        throw new Error(friendlyError(e?.code || ''));
      }
    }
    await new Promise(r => setTimeout(r, 300));
    return { uid: `local-${btoa(email).slice(0, 12)}`, email, displayName: email.split('@')[0] };
  },

  async signOut() {
    const fb = await firebaseAuth();
    if (fb) {
      try { await fb.signOut(getAuthInstance()!); } catch { /* ignore */ }
    }
  },

  /** Restore the signed-in Firebase user on page load (waits up to 2s). */
  restore(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      if (!isFirebaseConfigured()) return resolve(null);
      const auth = getAuthInstance();
      if (!auth) return resolve(null);
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        const timer = setTimeout(() => resolve(null), 2000);
        const unsub = onAuthStateChanged(auth, (user) => {
          clearTimeout(timer);
          unsub();
          if (user) {
            resolve({
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || (user.email || '').split('@')[0]
            });
          } else {
            resolve(null);
          }
        });
      });
    });
  },

  /**
   * Admin check. Allowed if the email is in ADMIN_EMAILS, or if a document
   * exists in the Firestore 'admins' collection with the email as its ID
   * (e.g. admins/admin@fedex.com — any field or an empty doc works).
   */
  async isAdminEmail(email: string): Promise<boolean> {
    const clean = email.toLowerCase().trim();
    if (ADMIN_EMAILS.includes(clean)) return true;
    if (isFirebaseConfigured()) {
      try {
        const db = getDb();
        if (db) {
          const { doc, getDoc } = await import('firebase/firestore');
          const snap = await withTimeout(getDoc(doc(db, 'admins', clean)), 3000);
          return snap.exists();
        }
      } catch (e) {
        console.warn('Firestore admin check failed.', e);
      }
    }
    return false;
  }
};
