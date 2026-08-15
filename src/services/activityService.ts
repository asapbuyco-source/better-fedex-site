import { isFirebaseConfigured, getDb, withTimeout } from '../utils/firebase';

export type ActivityType = 'order' | 'message' | 'account' | 'claim';

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  subtype: string;
  title: string;
  detail?: string;
  meta?: Record<string, string | number>;
  createdAt: string;
  read: boolean;
  source?: 'site' | 'firebase';
}

const KEY = 'fedex_activity';
const MAX = 200;

function read(): ActivityEntry[] {
  try {
    const data = localStorage.getItem(KEY);
    return data ? (JSON.parse(data) as ActivityEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: ActivityEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
  } catch (e) {
    console.error(e);
  }
}

function makeId(): string {
  return `ACT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export const activityService = {
  /** Record something a visitor did on the site. Also mirrors to Firestore when configured. */
  log(type: ActivityType, subtype: string, title: string, detail?: string, meta?: Record<string, string | number>): ActivityEntry {
    const entry: ActivityEntry = {
      id: makeId(),
      type,
      subtype,
      title,
      detail,
      meta,
      createdAt: new Date().toISOString(),
      read: false,
      source: 'site'
    };
    write([entry, ...read()]);
    void this.pushToFirebase(entry);
    return entry;
  },

  async pushToFirebase(entry: ActivityEntry) {
    if (!isFirebaseConfigured()) return;
    try {
      const db = getDb();
      if (!db) return;
      const { doc, setDoc } = await import('firebase/firestore');
      await withTimeout(setDoc(doc(db, 'activity', entry.id), entry), 5000);
    } catch (e) {
      console.warn('Failed to sync activity to Firestore (saved locally).', e);
    }
  },

  getAll(): ActivityEntry[] {
    return read().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getByType(type: ActivityType): ActivityEntry[] {
    return this.getAll().filter(e => e.type === type);
  },

  unreadCount(): number {
    return read().filter(e => !e.read).length;
  },

  markAllRead() {
    write(read().map(e => ({ ...e, read: true })));
  },

  markRead(id: string) {
    write(read().map(e => (e.id === id ? { ...e, read: true } : e)));
  },

  delete(id: string) {
    write(read().filter(e => e.id !== id));
  },

  clearAll() {
    write([]);
  },

  /** Pull activity recorded from other devices via Firestore (when configured). */
  async syncFromFirebase(): Promise<boolean> {
    if (!isFirebaseConfigured()) return false;
    try {
      const db = getDb();
      if (!db) return false;
      const { getDocs, collection } = await import('firebase/firestore');
      const snap = await withTimeout(getDocs(collection(db, 'activity')), 5000);
      if (snap.empty) return true;
      const remote = snap.docs.map(d => ({ ...(d.data() as ActivityEntry), source: 'firebase' as const }));
      const local = read();
      const merged = [...remote, ...local.filter(l => !remote.some(r => r.id === l.id))]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      write(merged);
      return true;
    } catch (e) {
      console.warn('Failed to sync activity from Firestore.', e);
      return false;
    }
  }
};
