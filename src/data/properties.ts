import { Property, NeighborhoodInfo } from '../types';

export const AGENT_PROFILE = {
  name: 'Babatunde Ademola',
  title: 'Principal Real Estate Advisory',
  license: 'REDAN Reg. No: RED/LGS/2021/884',
  company: 'Naija Prime Realty & Luxury Advisory',
  phone: '+234 803 892 4110',
  whatsapp: '2348038924110',
  email: 'babatunde@naijaprimerealty.com',
  office: 'Level 5, Capital Towers, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria',
  experienceYears: 14,
  salesVolumeNgn: '₦48 Billion+',
  bio: 'Babatunde Ademola is a premier real estate strategist specialising in prime residential acquisitions, off-plan investment portfolio structuring, and high-net-worth real estate transactions across Banana Island, Ikoyi, Victoria Island, and Lekki Phase 1.',
  avatar: '/src/assets/images/lagos_agent_profile_1785922540192.jpg',
};

export const EXCHANGE_RATES = {
  USD: 1520, // ₦1,520 per $1 USD
  GBP: 1940, // ₦1,940 per £1 GBP
};

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Solitaire Mansion - 5 Bed Luxury Waterfront Estate',
    tagline: 'Ultra-exclusive smart architectural masterpiece on the quiet shore of Banana Island.',
    priceNgn: 1850000000, // 1.85 Billion Naira
    pricePeriod: 'one-off',
    location: 'Banana Island',
    address: 'Zone A, Banana Island, Ikoyi, Lagos State',
    propertyType: 'Fully Detached Mansion',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 850,
    parkingSpaces: 6,
    titleDocument: "Governor's Consent",
    mainImage: '/src/assets/images/lagos_hero_mansion_1785922529173.jpg',
    images: [
      '/src/assets/images/lagos_hero_mansion_1785922529173.jpg',
      '/src/assets/images/lagos_penthouse_interior_1785922551026.jpg',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An exceptional custom-built 5-bedroom waterfront villa offering unparalleled serenity, privacy, and architectural splendour in Banana Island, Ikoyi. Features state-of-the-art Crestron home automation, private jetty access, overflow infinity swimming pool with Lagos Lagoon views, full floor master suite with bulletproof glass security doors, automated wine cellar, and two separate staff quarters (BQ).',
    features: [
      '24/7 Uninterrupted Dual Power Supply',
      'Private Lagoon Jet Docking',
      'Infinity Pool & Heated Jacuzzi',
      'Full Smart Home Automation',
      'Elevator across 3 Floors',
      'Fully Fitted Italian Chef Kitchen',
      'Bulletproof Security Doors & CCTV Matrix',
      'Cinema Room (10-Seater Dolby Atmos)',
      'Gymnasium & Sauna',
      '2 Room Maid Quarters (BQ)'
    ],
    isFeatured: true,
    yearBuilt: 2024,
    serviceChargeNgn: 3500000,
    coordinates: { lat: 6.4528, lng: 3.4389 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-2',
    title: 'The Azure Penthouse - Eko Atlantic Oceanfront Sky Residence',
    tagline: 'Panoramic Atlantic Ocean and Lagos skyline views from the 22nd floor.',
    priceNgn: 920000000, // 920 Million Naira
    pricePeriod: 'one-off',
    location: 'Eko Atlantic',
    address: 'Azuri Towers, Marina District, Eko Atlantic City, VI, Lagos',
    propertyType: 'Penthouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    sizeSqm: 520,
    parkingSpaces: 3,
    titleDocument: 'Certificate of Occupancy (C of O)',
    mainImage: '/src/assets/images/lagos_penthouse_interior_1785922551026.jpg',
    images: [
      '/src/assets/images/lagos_penthouse_interior_1785922551026.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched high above Eko Atlantic City, this duplex penthouse blends coastal tranquillity with cosmopolitan sophistication. Expansive floor-to-ceiling glass walls showcase breathtaking dual views of the Atlantic Ocean and Victoria Island marina. Finished with imported Spanish porcelain, custom Poggenpohl cabinetry, central VRF air conditioning, and access to private residents executive lounge.',
    features: [
      '360 Panoramic Ocean & Skyline Views',
      'Access to Helipad & Marina',
      'Central Chilled Water VRF AC System',
      'Olympic-sized Lap Pool & Sun Deck',
      'Fingerprint & Keycard Access Control',
      'High-Speed Schindler Elevators',
      'Concierge & 24hr Valet Services',
      'Zero-Flood City Infrastructure'
    ],
    isFeatured: true,
    yearBuilt: 2023,
    serviceChargeNgn: 4800000,
    coordinates: { lat: 6.421, lng: 3.408 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-3',
    title: 'Minimalist Contemporary Duplex in Lekki Phase 1',
    tagline: 'Sleek modern architecture with private roof deck and pool in prime Lekki.',
    priceNgn: 380000000, // 380 Million Naira
    pricePeriod: 'one-off',
    location: 'Lekki Phase 1',
    address: 'Admiralty Way Axis, Lekki Phase 1, Lagos',
    propertyType: 'Semi-Detached Duplex',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 380,
    parkingSpaces: 4,
    titleDocument: "Governor's Consent",
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean lines, warm teak wood accents, and expansive double-height ceilings define this newly completed 4-bedroom semi-detached residence. Situated in a secured, flood-free residential estate off Admiralty Way, Lekki Phase 1. Features a private plunge pool, skylight atrium, island kitchen with Bosch appliances, and a private rooftop lounge designed for entertaining.',
    features: [
      'Private Swimming Plunge Pool',
      'Rooftop Terrace Lounge',
      'Double-Volume Living Room Ceiling',
      'Fully Fitted Modern Bosch Kitchen',
      'Smart Lighting & Sound Pre-wire',
      'Dedicated Maid Room (BQ)',
      'Automated Access Gate',
      'Pre-installed Inverter & Solar System'
    ],
    isFeatured: true,
    yearBuilt: 2025,
    serviceChargeNgn: 1200000,
    coordinates: { lat: 6.447, lng: 3.472 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-4',
    title: 'The Crest - Serviced Luxury Residence in Old Ikoyi',
    tagline: 'Quiet leafy green street setting with 24/7 security and high rental yield.',
    priceNgn: 30000000, // 30 Million Naira / year
    pricePeriod: 'per annum',
    location: 'Ikoyi',
    address: 'Glover Road, Old Ikoyi, Lagos',
    propertyType: 'Luxury Apartment',
    status: 'For Rent',
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 280,
    parkingSpaces: 2,
    titleDocument: 'Certificate of Occupancy (C of O)',
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculately maintained 3-bedroom luxury apartment located in one of Old Ikoyi’s most desirable tree-lined residential sanctuaries. Ideal for expatriates, diplomats, and corporate executives. Fully serviced with round-the-clock power, uniform guards, swimming pool, equipped gym, and covered parking.',
    features: [
      '24/7 Guaranteed Uninterrupted Power',
      'Armed Security & Access Control',
      'Resort-style Swimming Pool',
      'Equipped Fitness Centre',
      'Water Treatment Plant',
      'High-Speed Fibre Optic Internet Ready',
      'En-suite Staff Room'
    ],
    isFeatured: false,
    yearBuilt: 2022,
    serviceChargeNgn: 4500000,
    coordinates: { lat: 6.454, lng: 3.431 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-5',
    title: 'The Sovereign Villa - 5 Bed Detached in Ikeja GRA',
    tagline: 'Timeless colonial charm meets contemporary luxury on a prime 1,200 sqm lot.',
    priceNgn: 680000000, // 680 Million Naira
    pricePeriod: 'one-off',
    location: 'Ikeja GRA',
    address: 'Isaac John Street Axis, Ikeja GRA, Lagos Mainland',
    propertyType: 'Fully Detached Mansion',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 1200,
    parkingSpaces: 8,
    titleDocument: 'Federal C of O',
    mainImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A rare find on Lagos Mainland’s most prestigious boulevard. This sprawling 5-bedroom detached mansion sits on 1,200 square meters of prime dry land in Ikeja GRA. Features manicured landscaped gardens, private swimming pool, outdoor gazebo bar, electric perimeter fence, private cinema room, and generous 3-room service quarters.',
    features: [
      '1,200 sqm Prime Land Parcel',
      'Manicured Tropical Garden & Gazebo',
      'Private Swimming Pool',
      'Private Cinema & Game Room',
      'Industrial Grade Water Purification',
      '3 Room Maid Quarters (BQ)',
      'Solar Microgrid System Installed'
    ],
    isFeatured: false,
    yearBuilt: 2021,
    serviceChargeNgn: 1800000,
    coordinates: { lat: 6.588, lng: 3.358 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-6',
    title: 'Shortlet Luxury Suite - Victoria Island Waterfront',
    tagline: 'Turnkey fully furnished boutique shortlet apartment with daily housekeeping.',
    priceNgn: 180000, // 180,000 Naira per night
    pricePeriod: 'per night',
    location: 'Victoria Island',
    address: 'Akin Adesola Street, Victoria Island, Lagos',
    propertyType: 'Luxury Apartment',
    status: 'Shortlet',
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 140,
    parkingSpaces: 2,
    titleDocument: 'Certificate of Occupancy (C of O)',
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672017486-42db20063229?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Styled specifically for diaspora visitors, business executives, and staycations in Lagos. Fully furnished with high-end designer pieces, Smart TVs with Netflix & DSTV Premium, superfast Fibre Internet, automated espresso machine, and private balcony overlooking the Five Cowries Creek.',
    features: [
      'Daily Housekeeping & Laundry Service',
      '24/7 Power Backup',
      'DSTV Premium & High-Speed Wifi',
      'Fully Equipped Kitchen with Espresso Maker',
      'Balcony with Lagoon View',
      'Airport Pickup Available on Request'
    ],
    isFeatured: false,
    yearBuilt: 2024,
    serviceChargeNgn: 0,
    coordinates: { lat: 6.428, lng: 3.422 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-7',
    title: 'The Terraces at Orchid - 4 Bed Smart Terrace Duplex',
    tagline: 'Off-plan investment opportunity with flexible 12-month payment plan.',
    priceNgn: 165000000, // 165 Million Naira
    pricePeriod: 'one-off',
    location: 'Chevron / Orchid',
    address: 'Orchid Road Axis, Lekki, Lagos',
    propertyType: 'Terraced Duplex',
    status: 'Off-Plan',
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 260,
    parkingSpaces: 3,
    titleDocument: "Governor's Consent",
    mainImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Prime off-plan residential development located on Orchid Road. High capital appreciation projected at 35% upon completion in Q4 2026. Features contemporary exterior cladding, smart door lock, fitted kitchen, stamped concrete driveways, and central drainage system.',
    features: [
      '30% Initial Deposit & Spread over 12 Months',
      'High Projected Capital Growth (35%+)',
      'Smart Door Lock & Video Doorbell',
      'Paved Central Estate Access Road',
      'Children Playground & Green Area'
    ],
    isFeatured: false,
    yearBuilt: 2026,
    serviceChargeNgn: 800000,
    coordinates: { lat: 6.438, lng: 3.52 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  },
  {
    id: 'prop-8',
    title: 'Waterfront Commercial Tower Floor - Oniru VI',
    tagline: 'Grade A corporate office space overlooking Atlantic ocean.',
    priceNgn: 45000000, // 45 Million Naira / year
    pricePeriod: 'per annum',
    location: 'Oniru',
    address: 'Ligali Ayorinde Extension, Oniru, Victoria Island, Lagos',
    propertyType: 'Commercial Space',
    status: 'For Rent',
    bedrooms: 0,
    bathrooms: 4,
    sizeSqm: 450,
    parkingSpaces: 10,
    titleDocument: "Governor's Consent",
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Open-plan Grade A commercial space ideal for corporate headquarters, tech hubs, private equity firms, or law practices in Oniru/Victoria Island. Features floor-to-ceiling double-glazed heat-reflective glass, dedicated transformer, fiber optic backbone, and ample parking.',
    features: [
      '450 sqm Open Plan Layout',
      'Dedicated Transformer & Diesel Generators',
      '10 Allocated Basement Parking Slots',
      'Central Chilled Water Air Conditioning',
      '24/7 Turnstile Security'
    ],
    isFeatured: false,
    yearBuilt: 2023,
    serviceChargeNgn: 6000000,
    coordinates: { lat: 6.43, lng: 3.44 },
    agentName: AGENT_PROFILE.name,
    agentPhone: AGENT_PROFILE.phone,
    agentEmail: AGENT_PROFILE.email,
    agentAvatar: AGENT_PROFILE.avatar
  }
];

export const NEIGHBORHOODS: NeighborhoodInfo[] = [
  {
    name: 'Banana Island',
    description: 'Nigeria’s most exclusive man-made luxury enclave. Known for ultra-high security, celebrity and billionaire residents, and serene waterfront living.',
    averagePriceRangeNgn: '₦1.2B - ₦4.5B',
    rentalYield: '7% - 9% Per Annum',
    highlights: ['Ultra Security Gate', 'Private Jet Ski Docks', 'Underground Utilities', 'Zero Noise Pollution'],
    image: '/src/assets/images/lagos_hero_mansion_1785922529173.jpg'
  },
  {
    name: 'Ikoyi',
    description: 'Historic upscale district with lush green avenues, embassies, golf courses, and luxury high-rise developments in Lagos.',
    averagePriceRangeNgn: '₦450M - ₦2.2B',
    rentalYield: '8% - 10% Per Annum',
    highlights: ['Ikoyi Club 1938 Golf Course', 'High Expatriate Presence', 'Glover & Bourdillon Enclaves', 'Top International Restaurants'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Eko Atlantic',
    description: 'Africa’s futuristic coastal city built on reclaimed land. Featuring advanced infrastructure, oceanfront promenades, and eco-friendly design.',
    averagePriceRangeNgn: '₦600M - ₦2.8B',
    rentalYield: '9% - 12% Per Annum (High USD Appeal)',
    highlights: ['Independent Power & Water Grid', 'Great Wall of Lagos Wave Defense', 'Financial Centre District', 'Helipads & Marina'],
    image: '/src/assets/images/lagos_penthouse_interior_1785922551026.jpg'
  },
  {
    name: 'Lekki Phase 1',
    description: 'Vibrant residential and lifestyle hub known for tech entrepreneurs, modern contemporary duplexes, fine dining, and lively waterfront spots.',
    averagePriceRangeNgn: '₦280M - ₦850M',
    rentalYield: '9% - 11% Per Annum',
    highlights: ['Admiralty Way Commercial Strip', 'Lekki Ikoyi Link Bridge', 'Gourmet Dining & Cafes', 'High Shortlet Demand'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Victoria Island',
    description: 'The financial powerhouse of Lagos State, seamlessly combining major corporate headquarters, luxury hotels, and high-end residential suites.',
    averagePriceRangeNgn: '₦350M - ₦1.8B',
    rentalYield: '8% - 10% Per Annum',
    highlights: ['Financial District', 'Art Galleries & Museums', 'Five Cowries Creek Views', 'Top Nightlife & Luxury Dining'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Ikeja GRA',
    description: 'The premier luxury residential neighborhood on Lagos Mainland. Known for tree-lined quiet avenues, top security, and proximity to Murtala Muhammed International Airport.',
    averagePriceRangeNgn: '₦400M - ₦1.1B',
    rentalYield: '7% - 9% Per Annum',
    highlights: ['Proximity to MMA Airport', 'Isaac John Food & Lifestyle Hub', 'Quiet Residential Character', 'Top Government & Business Executives'],
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    clientName: 'Chief Oladimeji Sanusi',
    role: 'Managing Director, Horizon Energy',
    location: 'Banana Island, Ikoyi',
    quote: 'Babatunde handled our Banana Island acquisition with immense professionalism. Title verification with Lagos State Lands Registry was seamless, and the property exceeded our expectations.',
    rating: 5,
  },
  {
    id: 2,
    clientName: 'Dr. Amara Okeke',
    role: 'Diaspora Investor (London, UK)',
    location: 'Eko Atlantic City',
    quote: 'Buying from abroad can be daunting, but Naija Prime Realty provided transparent virtual walkthroughs, legal document verification, and handled everything down to tenant management.',
    rating: 5,
  },
  {
    id: 3,
    clientName: 'Tunde & Folake Balogun',
    role: 'Tech Founders',
    location: 'Lekki Phase 1',
    quote: 'Found our dream smart home in Lekki Phase 1 through this platform. Sleek UI, accurate pricing, and instant response on WhatsApp.',
    rating: 5,
  }
];
