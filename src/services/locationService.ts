import { MOCK_LOCATIONS, FedExLocation } from '../data/locations';

export interface LocationSearchParams {
  query: string;
  typeFilter?: string;
  distanceRadius?: number;
}

export const locationService = {
  async searchLocations(params: LocationSearchParams): Promise<FedExLocation[]> {
    const queryLower = (params.query || '').trim().toLowerCase();

    await new Promise((resolve) => setTimeout(resolve, 100));
    
    if (!queryLower) {
      return MOCK_LOCATIONS;
    }

    // Filter matching city, zip, state or address
    const filtered = MOCK_LOCATIONS.filter(loc => 
      loc.city.toLowerCase().includes(queryLower) ||
      loc.zip.includes(queryLower) ||
      loc.state.toLowerCase().includes(queryLower) ||
      loc.address.toLowerCase().includes(queryLower) ||
      loc.name.toLowerCase().includes(queryLower)
    );

    if (filtered.length > 0) {
      return filtered;
    }

    // Fallback: create dynamic results with target query
    return [
      {
        id: 'dyn-1',
        name: `FedEx Office Print & Ship Center - ${params.query.toUpperCase()}`,
        type: 'FedEx Office',
        typeBadgeColor: '#4D148C',
        address: '100 Main Street',
        city: params.query.toUpperCase(),
        state: 'US',
        zip: '10001',
        phone: '(800) 463-3339',
        distance: '0.8 miles',
        status: 'Open Now',
        hoursToday: '8:00 AM - 8:00 PM',
        latestDropoffExpress: '6:30 PM',
        latestDropoffGround: '5:00 PM',
        services: ['Full Printing Services', 'Packing & Shipping', 'Hold at Location'],
        lat: 40.7128,
        lng: -74.0060
      },
      {
        id: 'dyn-2',
        name: `Walgreens - FedEx Authorized Dropoff (${params.query.toUpperCase()})`,
        type: 'Retail Dropoff (Walgreens)',
        typeBadgeColor: '#0068A8',
        address: '250 Central Ave',
        city: params.query.toUpperCase(),
        state: 'US',
        zip: '10002',
        phone: '(800) 463-3339',
        distance: '1.4 miles',
        status: 'Open Now',
        hoursToday: '7:00 AM - 10:00 PM',
        latestDropoffExpress: '5:00 PM',
        latestDropoffGround: '4:00 PM',
        services: ['Pre-labeled Dropoff', 'Hold at Location'],
        lat: 40.7150,
        lng: -74.0010
      }
    ];
  }
};
