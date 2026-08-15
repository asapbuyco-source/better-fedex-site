export interface ContentSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface ContentPageData {
  title: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
  heroImage?: string;
  sections: ContentSection[];
  cards?: { title: string; desc: string }[];
  cta?: { label: string; to: string };
}

export const CONTENT_PAGES: Record<string, ContentPageData> = {
  'shipping-overview': {
    title: 'All Shipping Services',
    subtitle: 'Everything you need to ship — express, ground, freight, international, and same-day, backed by a network covering 220+ countries and territories.',
    breadcrumb: [{ label: 'Shipping' }],
    heroImage: '/images/fedex-plane.jpg',
    cards: [
      { title: 'FedEx Express®', desc: 'Time-definite overnight and 2-day delivery, U.S. and worldwide.' },
      { title: 'FedEx Ground®', desc: 'Cost-effective day-definite delivery to businesses in 1-5 days.' },
      { title: 'FedEx Home Delivery®', desc: 'Residential delivery every day of the week, including evenings.' },
      { title: 'FedEx SameDay®', desc: 'Urgent shipments delivered door-to-door within hours, 24/7.' },
      { title: 'FedEx Freight®', desc: 'LTL and volume freight for palletized shipments over 150 lbs.' },
      { title: 'FedEx One Rate®', desc: 'Flat-rate pricing on Express packaging — no weighing or zone math.' }
    ],
    sections: [
      {
        heading: 'Getting started',
        body: 'Create a shipment online in minutes: enter addresses, pick a service, pay, and print your label. Drop off at any of 60,000+ locations or schedule a courier pickup.'
      },
      {
        heading: 'Why open an account?',
        bullets: [
          'Save up to 40% off FedEx Express® and 20% off FedEx Ground® published rates',
          'Free express packaging and supplies delivered to your door',
          'Address book, shipment history, and one-click re-ship',
          'Elegant invoicing with online bill pay and reporting'
        ]
      }
    ],
    cta: { label: 'Create a Shipment', to: '/shipping/ship' }
  },

  'international': {
    title: 'International Shipping Guide',
    subtitle: 'Ship to 220+ countries and territories with customs tools, duty calculators, and time-definite international services.',
    breadcrumb: [{ label: 'Shipping', to: '/shipping' }, { label: 'International' }],
    heroImage: '/images/fedex-plane.jpg',
    sections: [
      {
        heading: 'Customs documentation',
        body: 'Most international shipments need a commercial invoice. Upload your own or complete one online during the ship flow. Include accurate descriptions, values, and Harmonized System (HS) codes to avoid delays.'
      },
      {
        heading: 'Duties, taxes & fees',
        bullets: [
          'Dutiable items require the recipient or shipper to pay import duties and taxes',
          'FedEx Electronic Trade Documents (ETD) submits customs forms electronically — no printing',
          'Broker Select lets you choose your own customs broker for inbound freight',
          'Duties & Taxes Paid (DDP) billing options simplify the recipient experience'
        ]
      },
      {
        heading: 'Service options',
        body: 'FedEx International Priority® delivers in 1-3 business days to major markets, International Economy® offers cost-effective 2-5 day delivery, and International First® targets early-morning delivery in select cities.'
      },
      {
        heading: 'Restricted & prohibited items',
        body: 'Some items are restricted or prohibited by destination countries — including batteries, perishables, and aerosols. Always verify country-specific rules before shipping.'
      }
    ],
    cta: { label: 'Ship Internationally', to: '/shipping/ship' }
  },

  'drop-off': {
    title: 'Drop Off a Package',
    subtitle: 'Bring your pre-labeled package to any of 60,000+ FedEx locations — no waiting, no receipts, no appointments.',
    breadcrumb: [{ label: 'Shipping', to: '/shipping' }, { label: 'Drop Off' }],
    heroImage: '/images/fedex-truck.jpg',
    sections: [
      {
        heading: 'How drop-off works',
        bullets: [
          'Create and print your label online (or use a FedEx Office to print it for you)',
          'Attach the label so it fully covers any old labels',
          'Hand it to a team member or place it in a drop box — done'
        ]
      },
      {
        heading: 'Know your cutoff times',
        body: 'Each location has Express and Ground pickup cutoff times — often 5-7 PM at staffed locations and end-of-day for drop boxes. Ship before cutoff and your package moves the same evening.'
      },
      {
        heading: 'What fits in a drop box?',
        body: 'FedEx drop boxes accept packages up to 20" x 12" x 6" and 70 lbs. For larger shipments, visit a staffed FedEx Office or Walgreens location.'
      }
    ],
    cta: { label: 'Find a Drop-off Location', to: '/locations' }
  },

  'small-business': {
    title: 'Small Business Center',
    subtitle: 'Tools, education, and savings built for small businesses and e-commerce sellers.',
    breadcrumb: [{ label: 'Small Business' }],
    heroImage: '/images/fedex-boxes.jpg',
    cards: [
      { title: 'Save up to 40%', desc: 'Account discounts on Express and Ground shipping, plus supplies delivered free.' },
      { title: 'E-commerce toolkit', desc: 'Integrate shipping APIs, returns, and tracking into your storefront.' },
      { title: 'Business insights', desc: 'Articles, playbooks, and grant programs for growing brands.' },
      { title: 'Packaging expertise', desc: 'Free packing guidance and custom packing at FedEx Office.' }
    ],
    sections: [
      {
        heading: 'Built for founders',
        body: 'From solo sellers on marketplaces to multi-location retailers, the Small Business Center helps you ship smarter — with a dashboard for rates, pickups, analytics, and rewards through FedEx Rewards®.'
      }
    ],
    cta: { label: 'Open a Free Account', to: '/account?mode=signup' }
  },

  'about': {
    title: 'About FedEx',
    subtitle: 'Connecting people with possibilities, we move goods and information across 220+ countries and territories.',
    breadcrumb: [{ label: 'Our Company' }],
    sections: [
      {
        heading: 'Our purpose',
        body: 'FedEx exists to connect the world responsibly and resourcefully. What began as the first overnight express delivery company in 1971 has grown into a global logistics leader.'
      },
      {
        heading: 'By the numbers',
        bullets: [
          '700+ aircraft in the FedEx air fleet',
          'Over 220 countries and territories served',
          'Approximately 500,000 team members worldwide',
          'More than 16 million shipments per average business day'
        ]
      },
      {
        heading: 'Our portfolio',
        body: 'FedEx Corporation delivers a comprehensive suite of services through focused companies: FedEx Express, FedEx Ground, FedEx Freight, and FedEx Services — coordinated for a single, seamless customer experience.'
      }
    ]
  },

  'company': {
    title: 'Our Portfolio',
    subtitle: 'Focused operating companies, one integrated network.',
    breadcrumb: [{ label: 'Our Company', to: '/about' }, { label: 'Portfolio' }],
    cards: [
      { title: 'FedEx Express', desc: 'The world\'s largest express transportation company — time-definite delivery by air.' },
      { title: 'FedEx Ground', desc: 'Fast, economical ground delivery across the U.S. and Canada.' },
      { title: 'FedEx Freight', desc: 'A leading North American LTL freight carrier.' },
      { title: 'FedEx Services', desc: 'Sales, marketing, IT, communications, and customer support.' },
      { title: 'FedEx Logistics', desc: 'Specialized freight forwarding, customs brokerage, and supply chain solutions.' },
      { title: 'FedEx Office', desc: 'Retail print, packing, and shipping at 2,000+ locations.' }
    ],
    sections: []
  },

  'careers': {
    title: 'Careers at FedEx',
    subtitle: 'Join nearly 500,000 team members who move the world — with benefits, tuition assistance, and a people-first culture.',
    breadcrumb: [{ label: 'Our Company', to: '/about' }, { label: 'Careers' }],
    cards: [
      { title: 'Couriers & Drivers', desc: 'Deliver what matters in your community. CDL and non-CDL roles available.' },
      { title: 'Warehouse & Ramp', desc: 'Sort, load, and move freight at hubs and stations worldwide.' },
      { title: 'Corporate & Professional', desc: 'Marketing, finance, IT, data science, and operations leadership.' },
      { title: 'Student & Early Career', desc: 'Internships, co-ops, and leadership development programs.' }
    ],
    sections: [
      {
        heading: 'Why FedEx',
        bullets: [
          'Competitive pay and health benefits from day one',
          'Tuition assistance and education programs',
          'Career-path internal mobility across operating companies',
          'Award-winning diversity and inclusion programs'
        ]
      }
    ]
  },

  'investors': {
    title: 'Investor Relations',
    subtitle: 'Financial reports, earnings, and governance for FedEx Corporation (NYSE: FDX).',
    breadcrumb: [{ label: 'Our Company', to: '/about' }, { label: 'Investor Relations' }],
    sections: [
      {
        heading: 'Latest results (demo data)',
        body: 'Fourth quarter revenue of $22.2 billion with diluted EPS of $5.94, driven by yield improvement and DRIVE cost reductions. Full-year capital spending of $5.2 billion focused on fleet and automation.'
      },
      {
        heading: 'Key figures (demo data)',
        bullets: [
          'Annual revenue: $87.7B',
          'Diluted EPS: $17.80',
          'Dividend: $5.52 per share annually',
          'Buybacks: $2.5B authorization'
        ]
      },
      {
        heading: 'Governance',
        body: 'The FedEx Board of Directors oversees strategy, risk, and accountability. Review committee charters, codes of conduct, and proxy materials in the corporate governance section.'
      }
    ]
  },

  'newsroom': {
    title: 'FedEx Newsroom',
    subtitle: 'News, stories, and announcements from FedEx.',
    breadcrumb: [{ label: 'Our Company', to: '/about' }, { label: 'Newsroom' }],
    sections: [
      {
        heading: 'FedEx drives toward carbon-neutral operations by 2040',
        body: 'The company continues its investment in electric vehicles, sustainable fuels, and carbon sequestration, building on $2B+ of initial commitments.'
      },
      {
        heading: 'Peak season readiness',
        body: 'FedEx is scaling capacity with 2,000+ additional seasonal roles, expanded weekend delivery, and 30 automated facilities coming online this year.'
      },
      {
        heading: 'New FedEx Ground economy service for e-commerce',
        body: 'A cost-efficient solution for lightweight non-urgent e-commerce parcels launches across the U.S. network, with integrated returns.'
      }
    ]
  },

  'sustainability': {
    title: 'Sustainability & Corporate Responsibility',
    subtitle: 'Our goal: carbon-neutral global operations by 2040.',
    breadcrumb: [{ label: 'Our Company', to: '/about' }, { label: 'Responsibility' }],
    sections: [
      {
        heading: 'Carbon-neutral by 2040',
        body: 'We\'re electrifying our pickup and delivery fleet, investing in sustainable aviation fuel, and modernizing facilities to run on renewable energy — with an initial $2 billion commitment.'
      },
      {
        heading: 'Focus areas',
        bullets: [
          'Fleet electrification — thousands of EVs already in service',
          'Sustainable packaging innovation and recycling programs',
          'Fuel-efficient aircraft and optimized flight routing',
          'Community investment through FedEx Cares'
        ]
      }
    ]
  },

  'developer': {
    title: 'FedEx Developer Portal',
    subtitle: 'Integrate shipping, tracking, rates, and returns into your applications with REST APIs.',
    breadcrumb: [{ label: 'More From FedEx' }, { label: 'Developer Portal' }],
    sections: [
      {
        heading: 'REST APIs',
        bullets: [
          'Ship API — create labels, manage shipments, and generate return labels',
          'Track API — near real-time shipment tracking with webhooks',
          'Rates API — quoted rates across all services',
          'Locations API — find drop-off and staffed locations by geo-search',
          'Address Validation API — clean addresses at checkout'
        ]
      },
      {
        heading: 'Getting started',
        body: 'Register for a developer account, create a project, get your API key and secret, and test in the sandbox environment free of charge. OAuth 2.0 secures every request.'
      },
      {
        heading: 'FedEx Compatible',
        body: 'Discover pre-built integrations for leading e-commerce platforms, ERPs, and WMS systems — certified to work with FedEx APIs.'
      }
    ]
  },

  'mobile': {
    title: 'FedEx Mobile App',
    subtitle: 'Track, ship, hold, and manage deliveries from anywhere.',
    breadcrumb: [{ label: 'Mobile' }],
    sections: [
      {
        heading: 'Everything at your fingertips',
        bullets: [
          'One-view tracking with live map and push notifications',
          'Create shipments and find drop-off locations instantly',
          'Hold, redirect, or sign for packages with Delivery Manager',
          'Apple Watch and widget support'
        ]
      },
      {
        heading: 'Rated 4.8 stars',
        body: 'Millions of shipments are tracked through the FedEx mobile app every week. Download on the iOS App Store or Google Play.'
      }
    ]
  }
};
