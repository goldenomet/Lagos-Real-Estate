import React from 'react';
import { Search, MapPin, Building, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { FilterState, LocationArea, PropertyType, ListingStatus, TitleDocument } from '../types';

interface HeroSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearch: () => void;
  totalListingsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  setFilters,
  onSearch,
  totalListingsCount
}) => {
  const locations: (LocationArea | 'All Locations')[] = [
    'All Locations',
    'Banana Island',
    'Ikoyi',
    'Eko Atlantic',
    'Lekki Phase 1',
    'Victoria Island',
    'Ikeja GRA',
    'Chevron / Orchid'
  ];

  const propertyTypes: (PropertyType | 'All Types')[] = [
    'All Types',
    'Fully Detached Mansion',
    'Semi-Detached Duplex',
    'Terraced Duplex',
    'Penthouse',
    'Luxury Apartment'
  ];

  const titleOptions: (TitleDocument | 'All Titles')[] = [
    'All Titles',
    "Governor's Consent",
    'Certificate of Occupancy (C of O)'
  ];

  const statuses: (ListingStatus | 'All Statuses')[] = [
    'All Statuses',
    'For Sale',
    'For Rent',
    'Shortlet',
    'Off-Plan'
  ];

  return (
    <div className="relative bg-[#FFD600] text-[#0A0A0A] overflow-hidden py-16 sm:py-24 border-b border-[#0A0A0A]">
      
      {/* Background Image with Ambient Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/lagos_hero_mansion_1785922529173.jpg"
          alt="Lagos Luxury Estate"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD600] via-[#FFD600]/70 to-[#FFD600]/40" />
      </div>

      {/* Minimalist Adire-inspired Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="adire" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0,30 L30,0 L60,30 L30,60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="30" cy="30" r="5" fill="currentColor" />
            <path d="M15,15 L45,45 M45,15 L15,45" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#adire)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-[#0A0A0A] text-[#0A0A0A] text-xs font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Lagos Luxury Real Estate & Advisory</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] tracking-tight leading-tight max-w-3xl">
          Discover Extraordinary Homes in <span className="text-[#0A0A0A] italic font-normal bg-white px-2 py-0.5 rounded-sm">Lagos</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
          Specialising in verified luxury mansions, oceanfront penthouses, and high-yield off-plan developments in Ikoyi, Banana Island, Eko Atlantic, and Lekki Phase 1.
        </p>

        {/* Search & Filter Container */}
        <div className="mt-8 bg-white border border-[#0A0A0A] rounded-none p-4 sm:p-6 shadow-none max-w-5xl">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b border-[#0A0A0A]/80 pb-3">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilters(prev => ({ ...prev, status }))}
                className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                  filters.status === status
                    ? 'bg-[#0A0A0A] text-[#FFD600] shadow-none'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Location Selector */}
            <div className="bg-white/80 rounded-sm p-2.5 border border-[#0A0A0A]/60">
              <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value as any }))}
                className="w-full bg-transparent text-gray-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-white text-gray-800">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="bg-white/80 rounded-sm p-2.5 border border-[#0A0A0A]/60">
              <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                <Building className="w-3 h-3" /> Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as any }))}
                className="w-full bg-transparent text-gray-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type} className="bg-white text-gray-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Document Document Filter */}
            <div className="bg-white/80 rounded-sm p-2.5 border border-[#0A0A0A]/60">
              <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Land Title
              </label>
              <select
                value={filters.titleDocument}
                onChange={(e) => setFilters(prev => ({ ...prev, titleDocument: e.target.value as any }))}
                className="w-full bg-transparent text-gray-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {titleOptions.map((title) => (
                  <option key={title} value={title} className="bg-white text-gray-800">
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword / Title Search Button */}
            <button
              onClick={onSearch}
              className="w-full bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider rounded-sm p-3 flex items-center justify-center gap-2 transition-all shadow-none hover:shadow-[#5A5A40]/20"
            >
              <Search className="w-4 h-4" />
              <span>Explore Listings ({totalListingsCount})</span>
            </button>

          </div>

          {/* Quick Search Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Popular Enclaves:</span>
            {['Banana Island', 'Lekki Phase 1', 'Eko Atlantic Penthouse', 'Ikoyi Waterfront'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (tag.includes('Banana')) setFilters(prev => ({ ...prev, location: 'Banana Island' }));
                  else if (tag.includes('Lekki')) setFilters(prev => ({ ...prev, location: 'Lekki Phase 1' }));
                  else if (tag.includes('Eko')) setFilters(prev => ({ ...prev, location: 'Eko Atlantic' }));
                  else if (tag.includes('Ikoyi')) setFilters(prev => ({ ...prev, location: 'Ikoyi' }));
                  onSearch();
                }}
                className="px-2.5 py-0.5 rounded-none bg-white/60 hover:bg-[#0A0A0A]/20 hover:text-[#0A0A0A] border border-[#0A0A0A]/50 text-[11px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#0A0A0A]/80">
          <div>
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">₦48 Billion+</span>
            <span className="text-xs text-gray-500 font-normal">Transaction Volume Advisory</span>
          </div>
          <div>
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">100% Verified</span>
            <span className="text-xs text-gray-500 font-normal">Lagos State Title Audit</span>
          </div>
          <div>
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">Banana Island & VI</span>
            <span className="text-xs text-gray-500 font-normal">Exclusive Private Portfolio</span>
          </div>
          <div>
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">24/7 Concierge</span>
            <span className="text-xs text-gray-500 font-normal">Diaspora Direct Video Tours</span>
          </div>
        </div>

      </div>
    </div>
  );
};
