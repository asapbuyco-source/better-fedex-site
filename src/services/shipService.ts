import { TrackingDetail } from './trackingService';

export interface ShipmentRecord {
  trackingNumber: string;
  fromName: string;
  fromCity: string;
  toName: string;
  toCity: string;
  service: string;
  packaging: string;
  weightLbs: number;
  price: number;
  createdAt: string;
  deliveryEstimate: string;
  isReturn?: boolean;
}

export interface CreateShipmentInput {
  fromName: string;
  fromStreet: string;
  fromCity: string;
  fromZip: string;
  toName: string;
  toStreet: string;
  toCity: string;
  toZip: string;
  service: string;
  packaging: string;
  weightLbs: number;
  price: number;
  deliveryEstimate: string;
  isReturn?: boolean;
}

const STORAGE_KEY = 'fedex_shipments';

function generateTrackingNumber(): string {
  const digits = Math.floor(100000000000 + Math.random() * 900000000000);
  return String(digits);
}

export const shipService = {
  createShipment(input: CreateShipmentInput): ShipmentRecord {
    const record: ShipmentRecord = {
      trackingNumber: generateTrackingNumber(),
      fromName: input.fromName,
      fromCity: `${input.fromCity.toUpperCase()} ${input.fromZip}`,
      toName: input.toName,
      toCity: `${input.toCity.toUpperCase()} ${input.toZip}`,
      service: input.service,
      packaging: input.packaging,
      weightLbs: input.weightLbs,
      price: input.price,
      createdAt: new Date().toISOString(),
      deliveryEstimate: input.deliveryEstimate,
      isReturn: input.isReturn
    };

    try {
      const all = this.getShipments();
      all.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error(e);
    }

    return record;
  },

  getShipments(): ShipmentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toTrackingDetail(record: ShipmentRecord): TrackingDetail {
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
  }
};
