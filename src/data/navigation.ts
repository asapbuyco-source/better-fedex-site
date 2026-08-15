export interface NavLink {
  label: string;
  href: string;
  featured?: boolean;
  desc?: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  label: string;
  links: NavLink[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'shipping',
    label: 'Shipping',
    links: [
      { label: 'Create a Shipment', href: '/shipping/ship' },
      { label: 'Shipping Rates & Delivery Times', href: '/shipping/rates' },
      { label: 'Schedule & Manage Pickups', href: '/shipping/pickups' },
      { label: 'Packing & Shipping Supplies', href: '/shipping/supplies' },
      { label: 'International Shipping Guide', href: '/shipping/international' },
      { label: 'Freight', href: '/shipping/freight' },
      { label: 'Manage a Return', href: '/shipping/returns' },
      { label: 'ALL SHIPPING SERVICES', href: '/shipping', featured: true }
    ]
  },
  {
    id: 'tracking',
    label: 'Tracking',
    links: [
      { label: 'Advanced Shipment Tracking', href: '/tracking' },
      { label: 'Manage Your Delivery', href: '/delivery-manager' },
      { label: 'ALL TRACKING SERVICES', href: '/tracking', featured: true }
    ]
  },
  {
    id: 'design-print',
    label: 'Design & Print',
    links: [
      { label: 'Explore Print, Products & Design', href: '/print' },
      { label: 'Browse Services', href: '/print' },
      { label: 'VISIT NEW MARKETPLACE', href: '/print', featured: true }
    ]
  },
  {
    id: 'locations',
    label: 'Locations',
    links: [
      { label: 'Drop Off a Package', href: '/shipping/drop-off' },
      { label: 'Find a Location', href: '/locations', featured: true }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    links: [
      { label: 'Small Business Center', href: '/small-business' },
      { label: 'FedEx Service Guide', href: '/shipping' },
      { label: 'Account Management Tools', href: '/account' },
      { label: 'Frequently Asked Questions', href: '/support' },
      { label: 'File a Claim', href: '/support/claims' },
      { label: 'Billing & Invoicing', href: '/account' },
      { label: 'Customer Support', href: '/support' }
    ]
  }
];
