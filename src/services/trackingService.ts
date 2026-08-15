export interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  completed: boolean;
}

export interface TrackingDetail {
  trackingNumber: string;
  status: 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Exception' | 'Pending';
  statusColor: 'purple' | 'green' | 'orange' | 'red' | 'gray';
  statusDescription: string;
  estimatedDelivery: string;
  shipDate: string;
  origin: string;
  destination: string;
  service: string;
  weight: string;
  dimensions: string;
  signedBy?: string;
  pieceCount: number;
  progressPercent: number;
  events: TrackingEvent[];
}


import { isFirebaseConfigured, getDb, withTimeout } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const trackingService = {
  /** Track a number for real. Returns null when no shipment exists. */
  async trackNumber(trackingNum: string): Promise<TrackingDetail | null> {
    const cleanNum = trackingNum.trim().toUpperCase();

    // 1. Real Firestore lookup (when Firebase is configured via .env)
    if (isFirebaseConfigured()) {
      try {
        const db = getDb();
        if (db) {
          const snap = await withTimeout(getDoc(doc(db, 'shipments', cleanNum)), 3000);
          if (snap.exists()) {
            const data = snap.data() as TrackingDetail;
            this.saveToHistory(data);
            this.cacheTracked(data);
            return data;
          }
        }
      } catch (e) {
        console.warn('Firestore tracking lookup failed, using local data.', e);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 120));

    // 2. Admin-created shipments (local cache)
    try {
      const adminData = localStorage.getItem('fedex_admin_shipments');
      if (adminData) {
        const adminShipments = JSON.parse(adminData) as TrackingDetail[];
        const adminMatch = adminShipments.find(s => s.trackingNumber.toUpperCase() === cleanNum);
        if (adminMatch) {
          this.saveToHistory(adminMatch);
          this.cacheTracked(adminMatch);
          return adminMatch;
        }
      }
    } catch { /* ignore */ }

    // 3. User-created shipments (from Create a Shipment flow)
    const localShipment = this.getLocalShipment(cleanNum);
    if (localShipment) {
      this.saveToHistory(localShipment);
      this.cacheTracked(localShipment);
      return localShipment;
    }

    // Not found anywhere
    return null;
  },

  async trackMultiple(numbersString: string): Promise<(TrackingDetail | null)[]> {
    const rawNumbers = numbersString.split(/[\n,;]+/).map(n => n.trim()).filter(Boolean);
    const results = await Promise.all(rawNumbers.map(num => this.trackNumber(num)));
    return results;
  },

  getLocalShipment(trackingNum: string): TrackingDetail | null {
    try {
      const data = localStorage.getItem('fedex_shipments');
      if (!data) return null;
      const records = JSON.parse(data) as {
        trackingNumber: string;
        fromCity: string;
        toCity: string;
        service: string;
        weightLbs: number;
        createdAt: string;
        deliveryEstimate: string;
        isReturn?: boolean;
      }[];
      const record = records.find(r => r.trackingNumber === trackingNum);
      if (!record) return null;
      const created = new Date(record.createdAt);
      const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return {
        trackingNumber: record.trackingNumber,
        status: 'Pending',
        statusColor: 'purple',
        statusDescription: record.isReturn ? 'Return label created - awaiting drop-off' : 'Label created - awaiting pickup or drop-off',
        estimatedDelivery: record.deliveryEstimate,
        shipDate: `${fmt(created)} - ${created.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        origin: record.fromCity.toUpperCase(),
        destination: record.toCity.toUpperCase(),
        service: record.service,
        weight: `${record.weightLbs.toFixed(1)} lbs / ${(record.weightLbs * 0.4536).toFixed(2)} kg`,
        dimensions: '—',
        pieceCount: 1,
        progressPercent: 10,
        events: [
          {
            date: fmt(created),
            time: created.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            status: record.isReturn ? 'Return shipment information sent to FedEx' : 'Shipment information sent to FedEx',
            location: record.fromCity.toUpperCase(),
            completed: true
          }
        ]
      };
    } catch {
      return null;
    }
  },

  /** Keep full details of every tracked shipment so the Live Map can show them. */
  cacheTracked(detail: TrackingDetail) {
    try {
      const existing = this.getTracked().filter(t => t.trackingNumber !== detail.trackingNumber);
      const updated = [detail, ...existing].slice(0, 20);
      localStorage.setItem('fedex_tracked_shipments', JSON.stringify(updated));
    } catch { /* ignore */ }
  },

  getTracked(): TrackingDetail[] {
    try {
      const data = localStorage.getItem('fedex_tracked_shipments');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getHistory(): { number: string; status: string; date: string }[] {
    try {
      const data = localStorage.getItem('fedex_recent_tracking');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveToHistory(detail: TrackingDetail) {
    try {
      const existing = this.getHistory().filter(item => item.number !== detail.trackingNumber);
      const updated = [
        { number: detail.trackingNumber, status: detail.status, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
        ...existing
      ].slice(0, 5);
      localStorage.setItem('fedex_recent_tracking', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }
};
