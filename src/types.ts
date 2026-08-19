export type LocationArea = 
  | 'Ikoyi'
  | 'Banana Island'
  | 'Lekki Phase 1'
  | 'Victoria Island'
  | 'Eko Atlantic'
  | 'Ikeja GRA'
  | 'Chevron / Orchid'
  | 'Oniru';

export type PropertyType = 
  | 'Fully Detached Mansion'
  | 'Semi-Detached Duplex'
  | 'Terraced Duplex'
  | 'Penthouse'
  | 'Luxury Apartment'
  | 'Commercial Space';

export type ListingStatus = 'For Sale' | 'For Rent' | 'Shortlet' | 'Off-Plan';

export type TitleDocument = 
  | "Governor's Consent"
  | 'Certificate of Occupancy (C of O)'
  | 'Gazette'
  | 'Deed of Assignment'
  | 'Federal C of O';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  priceNgn: number; // in NGN
  pricePeriod?: 'one-off' | 'per annum' | 'per night';
  location: LocationArea;
  address: string;
  propertyType: PropertyType;
  status: ListingStatus;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  parkingSpaces: number;
  titleDocument: TitleDocument;
  mainImage: string;
  images: string[];
  description: string;
  features: string[];
  isFeatured?: boolean;
  yearBuilt?: number;
  serviceChargeNgn?: number;
  coordinates?: { lat: number; lng: number };
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentAvatar: string;
}

export interface NeighborhoodInfo {
  name: LocationArea;
  description: string;
  averagePriceRangeNgn: string;
  rentalYield: string;
  highlights: string[];
  image: string;
}

export interface FilterState {
  searchQuery: string;
  location: LocationArea | 'All Locations';
  status: ListingStatus | 'All Statuses';
  propertyType: PropertyType | 'All Types';
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  titleDocument: TitleDocument | 'All Titles';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export type Currency = 'NGN' | 'USD' | 'GBP';

export interface InspectionBooking {
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  type: 'In-Person Inspection' | 'WhatsApp Live Video Tour' | 'Virtual 3D Walkthrough';
  notes?: string;
}
