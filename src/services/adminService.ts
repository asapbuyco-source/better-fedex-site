import { TrackingDetail, TrackingEvent } from './trackingService';
import { isFirebaseConfigured, getDb, withTimeout } from '../utils/firebase';
import { getDocs, collection } from 'firebase/firestore';

export interface AdminShipment extends TrackingDetail {
  originCode: string;
  destCode: string;
  currentCode: string;
  createdAt: string;
  recipientName?: string;
  senderName?: string;
  recipientEmail?: string;
  senderEmail?: string;
}

const SHIPMENTS_KEY = 'fedex_admin_shipments';
const SESSION_KEY = 'fedex_admin_session';
const PASSWORD_KEY = 'fedex_admin_password';

const DEFAULT_PASSWORD = 'admin123';

/** Best-effort write to Firestore 'shipments' collection. Never throws. */
async function persistShipment(shipment: AdminShipment) {
  if (!isFirebaseConfigured()) return;
  try {
    const db = getDb();
    if (!db) return;
    const { doc, setDoc: writeDoc } = await import('firebase/firestore');
    await withTimeout(writeDoc(doc(db, 'shipments', shipment.trackingNumber), shipment), 5000);
  } catch (e) {
    console.warn('Failed to sync shipment to Firestore (saved locally).', e);
  }
}

/** Best-effort delete from Firestore. Never throws. */
async function removeShipmentRemote(trackingNumber: string) {
  if (!isFirebaseConfigured()) return;
  try {
    const db = getDb();
    if (!db) return;
    const { doc, deleteDoc: delDoc } = await import('firebase/firestore');
    await withTimeout(delDoc(doc(db, 'shipments', trackingNumber)), 5000);
  } catch (e) {
    console.warn('Failed to delete shipment from Firestore.', e);
  }
}

function readAll(): AdminShipment[] {
  try {
    const data = localStorage.getItem(SHIPMENTS_KEY);
    return data ? (JSON.parse(data) as AdminShipment[]) : [];
  } catch {
    return [];
  }
}

function writeAll(shipments: AdminShipment[]) {
  try {
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Sample shipment so a fresh install always has something complete to track.
 * Upserts (never overwrites user data); adds the sample only if its number is missing.
 */
export function seedSampleShipment() {
  try {
    const all = readAll();
    if (all.some(s => s.trackingNumber === '794612345678')) return;
    const now = new Date();
    const yesterday = new Date(now.getTime() - 86400000);
    const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const fmtTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sample: AdminShipment = {
      trackingNumber: '794612345678',
      status: 'In Transit',
      statusColor: 'purple',
      statusDescription: 'Arrived at FedEx hub - on schedule for delivery',
      estimatedDelivery: 'Tomorrow by 10:30 AM',
      shipDate: fmtDate(yesterday),
      origin: 'NASHVILLE, TN US',
      destination: 'DALLAS, TX US',
      service: 'FedEx Priority Overnight®',
      weight: '4.0 lbs / 1.81 kg',
      dimensions: '12 x 9 x 4 in',
      pieceCount: 1,
      progressPercent: 55,
      events: [
        { date: fmtDate(now), time: fmtTime(now), status: 'Arrived at FedEx hub', location: 'Memphis, TN', completed: true },
        { date: fmtDate(yesterday), time: '11:15 PM', status: 'Departed FedEx origin facility', location: 'Nashville, TN', completed: true },
        { date: fmtDate(yesterday), time: '09:20 AM', status: 'Picked up', location: 'Nashville, TN', completed: true },
        { date: fmtDate(yesterday), time: '08:05 AM', status: 'Shipment information sent to FedEx', location: 'Nashville, TN', completed: true }
      ],
      originCode: 'BNA',
      destCode: 'DFW',
      currentCode: 'MEM',
      createdAt: now.toISOString(),
      senderName: 'Acme Supply Co.',
      senderEmail: 'shipping@acmesupply.example',
      recipientName: 'Jordan Lee',
      recipientEmail: 'jordan.lee@example.com'
    };
    writeAll([sample, ...all]);
    void persistShipment(sample);
  } catch { /* ignore */ }
}

export function generateTrackingNumber(): string {
  return String(Math.floor(100000000000 + Math.random() * 900000000000));
}

export const adminService = {
  login(password: string): boolean {
    const stored = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === stored) {
      this.startSession();
      return true;
    }
    return false;
  },

  startSession() {
    localStorage.setItem(SESSION_KEY, new Date().toISOString());
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    try {
      return !!localStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  },

  changePassword(oldPw: string, newPw: string): boolean {
    const stored = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (oldPw !== stored || newPw.length < 4) return false;
    localStorage.setItem(PASSWORD_KEY, newPw);
    return true;
  },

  getAll(): AdminShipment[] {
    return readAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  /** Pull all shipments from Firestore into the local cache (when configured). */
  async syncFromFirebase(): Promise<boolean> {
    if (!isFirebaseConfigured()) return false;
    try {
      const db = getDb();
      if (!db) return false;
      const snap = await withTimeout(getDocs(collection(db, 'shipments')), 5000);
      if (snap.empty) return true;
      const rows = snap.docs.map(d => d.data() as AdminShipment);
      writeAll(rows);
      return true;
    } catch (e) {
      console.warn('Failed to sync shipments from Firestore.', e);
      return false;
    }
  },

  getByNumber(trackingNumber: string): AdminShipment | null {
    const clean = trackingNumber.trim().toUpperCase();
    return readAll().find(s => s.trackingNumber.toUpperCase() === clean) || null;
  },

  createShipment(input: Omit<AdminShipment, 'createdAt'>): AdminShipment {
    const all = readAll();
    const shipment: AdminShipment = { ...input, createdAt: new Date().toISOString() };
    const idx = all.findIndex(s => s.trackingNumber === shipment.trackingNumber);
    if (idx >= 0) {
      all[idx] = shipment;
    } else {
      all.unshift(shipment);
    }
    writeAll(all);
    void persistShipment(shipment);
    return shipment;
  },

  deleteShipment(trackingNumber: string) {
    writeAll(readAll().filter(s => s.trackingNumber !== trackingNumber));
    void removeShipmentRemote(trackingNumber);
  },

  addEvent(trackingNumber: string, event: TrackingEvent, newStatus?: { status: AdminShipment['status']; statusColor: AdminShipment['statusColor']; statusDescription: string; progressPercent: number; currentCode: string }) {
    const all = readAll();
    const idx = all.findIndex(s => s.trackingNumber === trackingNumber);
    if (idx < 0) return;
    all[idx].events = [event, ...all[idx].events];
    if (newStatus) {
      all[idx].status = newStatus.status;
      all[idx].statusColor = newStatus.statusColor;
      all[idx].statusDescription = newStatus.statusDescription;
      all[idx].progressPercent = newStatus.progressPercent;
      all[idx].currentCode = newStatus.currentCode;
    }
    writeAll(all);
    void persistShipment(all[idx]);
  },

  stats() {
    const all = readAll();
    return {
      total: all.length,
      inTransit: all.filter(s => s.status === 'In Transit').length,
      outForDelivery: all.filter(s => s.status === 'Out for Delivery').length,
      delivered: all.filter(s => s.status === 'Delivered').length,
      exception: all.filter(s => s.status === 'Exception').length,
      pending: all.filter(s => s.status === 'Pending').length
    };
  }
};
