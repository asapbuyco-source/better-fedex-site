export interface FedExLocation {
  id: string;
  name: string;
  type: 'FedEx Office' | 'FedEx Ship Center' | 'Retail Dropoff (Walgreens)' | 'Retail Dropoff (Dollar General)' | 'FedEx Self-Service Drop Box';
  typeBadgeColor: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string;
  status: 'Open Now' | 'Closed' | 'Closing Soon';
  hoursToday: string;
  latestDropoffExpress: string;
  latestDropoffGround: string;
  services: string[];
  lat: number;
  lng: number;
}

export const MOCK_LOCATIONS: FedExLocation[] = [
  {
    id: 'loc-1',
    name: 'FedEx Office Print & Ship Center',
    type: 'FedEx Office',
    typeBadgeColor: '#4D148C',
    address: '1211 Avenue of the Americas',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    phone: '(212) 555-0192',
    distance: '0.3 miles',
    status: 'Open Now',
    hoursToday: '8:00 AM - 9:00 PM',
    latestDropoffExpress: '7:30 PM',
    latestDropoffGround: '6:00 PM',
    services: ['Full Printing Services', 'Packing & Shipping', 'Passport Photos', 'Hold at Location', 'Direct Mail'],
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: 'loc-2',
    name: 'Walgreens - FedEx Authorized Dropoff',
    type: 'Retail Dropoff (Walgreens)',
    typeBadgeColor: '#0068A8',
    address: '1471 Broadway',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    phone: '(212) 555-4301',
    distance: '0.5 miles',
    status: 'Open Now',
    hoursToday: '7:00 AM - 11:00 PM',
    latestDropoffExpress: '5:00 PM',
    latestDropoffGround: '4:00 PM',
    services: ['Pre-labeled Dropoff', 'Hold at Location', 'QR Code Return Scan'],
    lat: 40.7562,
    lng: -73.9868
  },
  {
    id: 'loc-3',
    name: 'FedEx Ship Center',
    type: 'FedEx Ship Center',
    typeBadgeColor: '#330066',
    address: '560 10th Ave',
    city: 'New York',
    state: 'NY',
    zip: '10018',
    phone: '(800) 463-3339',
    distance: '0.9 miles',
    status: 'Open Now',
    hoursToday: '7:00 AM - 8:00 PM',
    latestDropoffExpress: '8:00 PM',
    latestDropoffGround: '7:00 PM',
    services: ['Dangerous Goods Shipping', 'Freight Pickups', 'Heavy Package Dropoff', 'Customs Support'],
    lat: 40.7581,
    lng: -73.9961
  },
  {
    id: 'loc-4',
    name: 'Dollar General - FedEx Dropoff Partner',
    type: 'Retail Dropoff (Dollar General)',
    typeBadgeColor: '#FF6600',
    address: '220 W 42nd St',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    phone: '(212) 555-8821',
    distance: '0.6 miles',
    status: 'Open Now',
    hoursToday: '8:00 AM - 10:00 PM',
    latestDropoffExpress: '4:30 PM',
    latestDropoffGround: '3:30 PM',
    services: ['Pre-labeled Dropoff', 'Hold at Location'],
    lat: 40.7569,
    lng: -73.9880
  },
  {
    id: 'loc-5',
    name: '24/7 FedEx Self-Service Drop Box',
    type: 'FedEx Self-Service Drop Box',
    typeBadgeColor: '#555555',
    address: '1251 Avenue of the Americas Plaza',
    city: 'New York',
    state: 'NY',
    zip: '10020',
    phone: '(800) 463-3339',
    distance: '0.4 miles',
    status: 'Open Now',
    hoursToday: '24 Hours',
    latestDropoffExpress: '6:00 PM',
    latestDropoffGround: '5:00 PM',
    services: ['Express Dropoff Envelope & Small Box', '24/7 Outdoor Access'],
    lat: 40.7598,
    lng: -73.9815
  }
];
