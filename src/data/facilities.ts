export interface Facility {
  code: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  hub?: boolean;
}

export const FACILITIES: Facility[] = [
  { code: 'MEM', city: 'Memphis', state: 'TN', lat: 35.1495, lng: -90.049, hub: true },
  { code: 'EWR', city: 'Newark', state: 'NJ', lat: 40.7357, lng: -74.1724, hub: true },
  { code: 'LAX', city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437, hub: true },
  { code: 'ORD', city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298, hub: true },
  { code: 'IND', city: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581, hub: true },
  { code: 'DFW', city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.797, hub: true },
  { code: 'ATL', city: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388, hub: true },
  { code: 'OAK', city: 'Oakland', state: 'CA', lat: 37.8044, lng: -122.2712, hub: true },
  { code: 'SEA', city: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { code: 'AUS', city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { code: 'MIA', city: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { code: 'BOS', city: 'Boston', state: 'MA', lat: 42.3601, lng: -71.0589 },
  { code: 'DEN', city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { code: 'PHL', city: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  { code: 'ELP', city: 'El Paso', state: 'TX', lat: 31.7619, lng: -106.485 },
  { code: 'NYC', city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
  { code: 'PHX', city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.074 },
  { code: 'DTW', city: 'Detroit', state: 'MI', lat: 42.3314, lng: -83.0458 },
  { code: 'MSP', city: 'Minneapolis', state: 'MN', lat: 44.9778, lng: -93.265 },
  { code: 'SLC', city: 'Salt Lake City', state: 'UT', lat: 40.7608, lng: -111.891 },
  { code: 'LAS', city: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
  { code: 'HOU', city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { code: 'CLT', city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { code: 'MCO', city: 'Orlando', state: 'FL', lat: 28.5383, lng: -81.3792 },
  { code: 'STL', city: 'St. Louis', state: 'MO', lat: 38.627, lng: -90.1994 },
  { code: 'KC', city: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
  { code: 'PDX', city: 'Portland', state: 'OR', lat: 45.5152, lng: -122.6784 },
  { code: 'SFO', city: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
  { code: 'SAN', city: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { code: 'BNA', city: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
];

export function findFacilityByLocation(location: string): Facility | null {
  const normalized = location.toUpperCase();
  return FACILITIES.find(f => normalized.includes(f.city.toUpperCase())) || null;
}

export function getFacilityByCode(code: string): Facility {
  return FACILITIES.find(f => f.code === code) || FACILITIES[0];
}

export function hashStringToCoords(seedStr: string): { lat: number; lng: number } {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const lat = 30 + (seed % 150) / 10;
  const lng = -120 + ((seed >> 8) % 550) / 10;
  return { lat: Math.min(lat, 48), lng: Math.max(lng, -125) };
}
