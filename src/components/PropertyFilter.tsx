import React from 'react';
import { FilterState, LocationArea, PropertyType, ListingStatus, TitleDocument } from '../types';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface PropertyFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  setFilters,
  totalResults
}) => {
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      location: 'All Locations',
      status: 'All Statuses',
      propertyType: 'All Types',
      minPrice: 0,
      maxPrice: 2000000000,
      minBedrooms: 0,
      titleDocument: 'All Titles',
      sortBy: 'featured'
    });
  };

  return (
    <div className="bg-white border border-[#0A0A0A] rounded-none p-4 sm:p-6 mb-8 text-gray-800">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#0A0A0A]">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by keywords (e.g., Waterfront, Banana Island, Pool, Cinema, Smart)..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-white border border-[#0A0A0A] rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#0A0A0A]/50"
          />
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white border border-[#0A0A0A] rounded-sm px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]/50 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0A0A0A] py-1.5 px-2 rounded-sm hover:bg-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* Filter Options Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        
        {/* Location */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
            Area / Enclave
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value as any }))}
            className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]/50 cursor-pointer"
          >
            <option value="All Locations">All Locations</option>
            <option value="Banana Island">Banana Island</option>
            <option value="Ikoyi">Ikoyi</option>
            <option value="Eko Atlantic">Eko Atlantic</option>
            <option value="Lekki Phase 1">Lekki Phase 1</option>
            <option value="Victoria Island">Victoria Island</option>
            <option value="Ikeja GRA">Ikeja GRA</option>
            <option value="Chevron / Orchid">Chevron / Orchid</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
            Property Style
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as any }))}
            className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]/50 cursor-pointer"
          >
            <option value="All Types">All Types</option>
            <option value="Fully Detached Mansion">Fully Detached Mansion</option>
            <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
            <option value="Terraced Duplex">Terraced Duplex</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Luxury Apartment">Luxury Apartment</option>
          </select>
        </div>

        {/* Min Bedrooms */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
            Min Bedrooms
          </label>
          <select
            value={filters.minBedrooms}
            onChange={(e) => setFilters(prev => ({ ...prev, minBedrooms: Number(e.target.value) }))}
            className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]/50 cursor-pointer"
          >
            <option value={0}>Any Bedrooms</option>
            <option value={2}>2+ Bedrooms</option>
            <option value={3}>3+ Bedrooms</option>
            <option value={4}>4+ Bedrooms</option>
            <option value={5}>5+ Bedrooms</option>
          </select>
        </div>

        {/* Title Verification */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
            Title Document
          </label>
          <select
            value={filters.titleDocument}
            onChange={(e) => setFilters(prev => ({ ...prev, titleDocument: e.target.value as any }))}
            className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2 text-xs text-gray-800 focus:outline-none focus:border-[#0A0A0A]/50 cursor-pointer"
          >
            <option value="All Titles">All Verified Titles</option>
            <option value="Governor's Consent">Governor's Consent</option>
            <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy</option>
          </select>
        </div>

      </div>

      <div className="mt-4 pt-3 border-t border-[#0A0A0A]/60 flex items-center justify-between text-xs text-gray-500">
        <span>Showing <strong className="text-[#0A0A0A]">{totalResults}</strong> verified properties</span>
        <span className="hidden sm:inline">100% Direct Estate Agent & Developer Filings</span>
      </div>

    </div>
  );
};
