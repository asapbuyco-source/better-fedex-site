export interface NavSectionColumn {
  title: string;
  links: { label: string; href: string; badge?: string; desc?: string }[];
}

export interface NavItem {
  id: string;
  label: string;
  columns: NavSectionColumn[];
  cta?: {
    text: string;
    subtext: string;
    actionLabel: string;
    target: string;
  };
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'shipping',
    label: 'Shipping',
    cta: {
      text: 'Save up to 40% on FedEx Express',
      subtext: 'Open a free account and start shipping today with exclusive discounts.',
      actionLabel: 'Open Account',
      target: '/account?mode=signup'
    },
    columns: [
      {
        title: 'TOP ACTIONS',
        links: [
          { label: 'Create a Shipment', href: '/shipping/ship', desc: 'Create labels, pay, and print online' },
          { label: 'Calculate Rates & Transit Times', href: '/shipping/rates', desc: 'Get quick estimate and delivery options' },
          { label: 'Schedule a Pickup', href: '/shipping/pickups', desc: 'Have a driver pick up your package' },
          { label: 'Order Packing Supplies', href: '/shipping/supplies', desc: 'Free FedEx Express shipping boxes & envelopes' }
        ]
      },
      {
        title: 'SHIPPING SERVICES',
        links: [
          { label: 'All Shipping Services', href: '/shipping' },
          { label: 'FedEx Freight® (Heavy Cargo)', href: '/shipping/freight', badge: 'Cargo' },
          { label: 'International Shipping Guide', href: '/shipping/international' },
          { label: 'Manage a Return', href: '/shipping/returns' }
        ]
      },
      {
        title: 'TOOLS & INTEGRATIONS',
        links: [
          { label: 'FedEx Ship Manager®', href: '/shipping/ship' },
          { label: 'E-commerce Solutions & APIs', href: '/developer' },
          { label: 'Customs & Global Trade Tools', href: '/shipping/international' },
          { label: 'Drop Off a Package', href: '/shipping/drop-off' }
        ]
      }
    ]
  },
  {
    id: 'tracking',
    label: 'Tracking',
    cta: {
      text: 'Take control of your deliveries',
      subtext: 'Get picture proof of delivery and set delivery preferences with FedEx Delivery Manager®.',
      actionLabel: 'Sign Up Free',
      target: '/delivery-manager'
    },
    columns: [
      {
        title: 'TRACKING TOOLS',
        links: [
          { label: 'Track a Package', href: '/tracking', desc: 'Instant status, location, and estimated delivery' },
          { label: 'FedEx Delivery Manager®', href: '/delivery-manager', desc: 'Customize home deliveries, hold package, reroute' },
          { label: 'Proof of Delivery', href: '/support', desc: 'Request signature proof or photo verification' }
        ]
      },
      {
        title: 'DELIVERY MANAGEMENT',
        links: [
          { label: 'FedEx Mobile App', href: '/mobile', badge: 'App' },
          { label: 'Manage Returns', href: '/shipping/returns' },
          { label: 'Hold Package at Retail Spot', href: '/delivery-manager' }
        ]
      },
      {
        title: 'HELP & SUPPORT',
        links: [
          { label: 'Where is my package?', href: '/support' },
          { label: 'File a Claim', href: '/support/claims' },
          { label: 'Service Alerts & Weather Delays', href: '/service-alerts' }
        ]
      }
    ]
  },
  {
    id: 'design-print',
    label: 'Design & Print',
    cta: {
      text: 'Need custom marketing print?',
      subtext: 'Get 20% off your first print order over $50 at FedEx Office.',
      actionLabel: 'Explore Offers',
      target: '/print'
    },
    columns: [
      {
        title: 'PRODUCTS & SERVICES',
        links: [
          { label: 'Explore Print, Products & Design', href: '/print', desc: 'Business cards, banners, posters, and more' },
          { label: 'Passport Photos', href: '/print?category=passport', badge: 'In-Store' },
          { label: 'Documents & Presentations', href: '/print?category=documents' },
          { label: 'Signs, Banners & Graphics', href: '/print?category=signs' }
        ]
      },
      {
        title: 'PRINT SOLUTIONS',
        links: [
          { label: 'In-Store Self-Service Printing', href: '/print' },
          { label: 'FedEx Office Print Online', href: '/print' },
          { label: 'Direct Mail Printing & Mailing', href: '/print' },
          { label: 'Find a FedEx Office Location', href: '/locations' }
        ]
      }
    ]
  },
  {
    id: 'locations',
    label: 'Locations',
    cta: {
      text: 'Convenient package drop-off',
      subtext: 'Drop off at over 60,000 locations including Walgreens, Dollar General, and FedEx Office.',
      actionLabel: 'Find Nearby Spot',
      target: '/locations'
    },
    columns: [
      {
        title: 'FIND LOCATIONS',
        links: [
          { label: 'Find a FedEx Location', href: '/locations', desc: 'Search by ZIP, city, or current GPS' },
          { label: 'Drop Off a Package', href: '/shipping/drop-off', desc: 'Find latest drop-off pickup cutoff times' },
          { label: 'Hold at Location (HAL)', href: '/delivery-manager', desc: 'Have package delivered securely to retail store' }
        ]
      },
      {
        title: 'RETAIL NETWORK',
        links: [
          { label: 'FedEx Office® Centers', href: '/locations?type=FedEx Office' },
          { label: 'Walgreens Drop-Off', href: '/locations?type=Walgreens' },
          { label: 'FedEx Self-Service Drop Boxes (24/7)', href: '/locations?type=Drop Box' }
        ]
      }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    cta: {
      text: '24/7 Customer Support',
      subtext: 'Have a question? Browse our Help Center or connect with our automated virtual assistant.',
      actionLabel: 'Get Help',
      target: '/support'
    },
    columns: [
      {
        title: 'CUSTOMER SUPPORT',
        links: [
          { label: 'Customer Support Center', href: '/support', desc: 'Search help articles, guides, and FAQs' },
          { label: 'File a Claim / Dispute Charge', href: '/support/claims', desc: 'Submit loss, damage, or billing claims' },
          { label: 'Billing & Invoicing Center', href: '/account' },
          { label: 'Service Alerts', href: '/service-alerts' }
        ]
      },
      {
        title: 'COMPANY & RESOURCES',
        links: [
          { label: 'Small Business Center', href: '/small-business', badge: 'Hub' },
          { label: 'About FedEx', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'FedEx Newsroom', href: '/newsroom' }
        ]
      }
    ]
  }
];
