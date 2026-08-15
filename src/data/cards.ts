export interface ContentCard {
  id: string;
  title: string;
  badge?: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  category?: string;
  iconName?: string;
}

export const QUICK_ACTION_LINKS = [
  {
    id: 'dropoff',
    icon: 'PackageCheck',
    title: 'drop off a package',
    action: 'locations'
  },
  {
    id: 'redirect',
    icon: 'RefreshCw',
    title: 'Redirect a package',
    action: 'fdm'
  },
  {
    id: 'hours',
    icon: 'Clock',
    title: 'Store hours and services',
    action: 'locations'
  },
  {
    id: 'alerts',
    icon: 'AlertTriangle',
    title: 'service alerts',
    action: 'alerts'
  },
  {
    id: 'returns',
    icon: 'Undo2',
    title: 'Return a package',
    action: 'returns'
  }
];

export const BENEFIT_CARDS: ContentCard[] = [
  {
    id: 'card-innovative',
    title: 'Innovative solutions for reliability & speed',
    description: "Whether it's across states or worldwide, we prioritize the secure and swift arrival of your shipments."
  },
  {
    id: 'card-premium',
    title: 'Premium shipping at professional rates',
    description: 'When you need reliable delivery and careful handling, trust FedEx to get your items where they need to go on time.'
  },
  {
    id: 'card-everywhere',
    title: 'We ship everywhere*',
    description: 'From major cities to remote locations, your goods can reach worldwide.'
  },
  {
    id: 'card-onerate',
    title: 'FedEx can ship for less than the Post Office',
    description: 'Two-day shipping, one flat rate. FedEx One Rate®.**'
  }
];

export const GUIDANCE_CARDS: ContentCard[] = [
  {
    id: 'guide-packaging',
    title: 'How to pack like a pro',
    badge: 'Packing Tips',
    description: 'Learn best practices for cushioning, box selection, weight distribution, and sealing to make sure your shipment arrives in perfect condition.',
    ctaText: 'View Packing Guide',
    ctaLink: '#packing-guide'
  },
  {
    id: 'guide-intl',
    title: 'Simplify international customs',
    badge: 'Global Trade',
    description: 'Use automated customs documentation, lookup Harmonized Tariff codes, and calculate duties & taxes before shipping across borders.',
    ctaText: 'Explore Global Tools',
    ctaLink: '#intl-tools'
  },
  {
    id: 'guide-sustainability',
    title: 'Sustainable packaging & carbon neutral goals',
    badge: 'ESG & Innovation',
    description: 'Explore our commitment to 100% reusable packaging materials and route optimization to reach carbon-neutral operations by 2040.',
    ctaText: 'Learn About Sustainability',
    ctaLink: '#sustainability'
  }
];

export const SURCHARGE_INFO = [
  {
    title: 'Fuel Surcharge Updates',
    date: 'Updated Weekly',
    desc: 'Review weekly FedEx Express, Ground, and Freight fuel surcharge percentages based on U.S. Gulf Coast fuel spot prices.',
    linkText: 'Check Current Fuel Rates'
  },
  {
    title: 'Money-Back Guarantee',
    date: 'Policy Info',
    desc: 'The FedEx Money-Back Guarantee applies to select U.S. Express shipments. Learn about eligibility conditions and request procedures.',
    linkText: 'Read Money-Back Terms'
  },
  {
    title: '2026 Rate Adjustments & Service Guide',
    date: 'Service Guide',
    desc: 'Download the comprehensive 2026 FedEx Service Guide for complete pricing tables, delivery zones, dimensions, and surcharges.',
    linkText: 'Download Service Guide (PDF)'
  }
];
