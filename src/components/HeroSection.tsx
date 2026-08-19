import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Building, Shield, ArrowUpRight, Bed, Bath, Compass, CheckCircle2, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { FilterState, LocationArea, PropertyType, ListingStatus, TitleDocument, Currency, Property } from '../types';
import { PROPERTIES } from '../data/properties';
import { formatPrice } from '../utils/formatters';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearch: () => void;
  totalListingsCount: number;
  currency?: Currency;
  onSelectProperty?: (property: Property) => void;
  onBookInspection?: (property: Property) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  setFilters,
  onSearch,
  totalListingsCount,
  currency = 'NGN' as Currency,
  onSelectProperty,
  onBookInspection
}) => {
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const featuredSpotlights = PROPERTIES.filter(p => p.isFeatured).slice(0, 4);
  const currentSpotlight = featuredSpotlights[activeSpotlightIndex] || PROPERTIES[0];

  // Automatic Carousel Interval (4.5 seconds)
  useEffect(() => {
    if (isPaused || featuredSpotlights.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSpotlightIndex((prev) => (prev + 1) % featuredSpotlights.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, featuredSpotlights.length]);

  const handleNextSpotlight = () => {
    setActiveSpotlightIndex((prev) => (prev + 1) % featuredSpotlights.length);
  };

  const handlePrevSpotlight = () => {
    setActiveSpotlightIndex((prev) => (prev - 1 + featuredSpotlights.length) % featuredSpotlights.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

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
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="gsap-hero-container relative bg-[#FFD600] text-[#0A0A0A] overflow-hidden py-14 sm:py-20 border-b border-[#0A0A0A] transition-colors"
    >
      {/* Interactive Ambient Mouse Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.45), transparent 70%)`
        }}
      />

      {/* Background Image with Ambient Overlay */}
      <div className="gsap-hero-bg absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ikoyi_and_Beyond.jpg/1280px-Ikoyi_and_Beyond.jpg"
          alt="Lagos Luxury Estate"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD600] via-[#FFD600]/80 to-[#FFD600]/50" />
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

      <div className="gsap-hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge with Pulse */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white border border-[#0A0A0A] text-[#0A0A0A] text-xs font-bold tracking-wider uppercase shadow-none"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>Curated Lagos Luxury Real Estate & Advisory</span>
          </motion.div>
        </div>

        {/* Main Grid: Headline & Search + Live Interactive Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Headline, Summary & Search Container */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] leading-tight"
              >
                Discover Extraordinary Homes in{' '}
                <motion.span 
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-block text-[#0A0A0A] italic font-normal bg-white px-2.5 py-0.5 rounded-sm border border-[#0A0A0A] cursor-default shadow-sm"
                >
                  Lagos
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="mt-4 text-sm sm:text-base text-gray-800 max-w-2xl font-normal leading-relaxed"
              >
                Specialising in verified luxury mansions, oceanfront penthouses, and high-yield off-plan developments in Ikoyi, Banana Island, Eko Atlantic, and Lekki Phase 1.
              </motion.p>
            </div>

            {/* Interactive Search & Filter Card */}
            <div className="bg-white border border-[#0A0A0A] rounded-none p-4 sm:p-6 shadow-none relative overflow-hidden transition-all">
              
              {/* Status Tabs with smooth indicator */}
              <div className="flex flex-wrap gap-2 mb-4 border-b border-[#0A0A0A]/80 pb-3">
                {statuses.map((status) => {
                  const isActive = filters.status === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setFilters(prev => ({ ...prev, status }))}
                      className={`relative px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? 'text-[#FFD600] bg-[#0A0A0A]'
                          : 'text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100'
                      }`}
                    >
                      {status}
                      {isActive && (
                        <motion.div
                          layoutId="active-hero-status"
                          className="absolute inset-0 bg-[#0A0A0A] rounded-sm -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Location Selector */}
                <div className="bg-white rounded-sm p-2.5 border border-[#0A0A0A]/60 focus-within:border-[#0A0A0A] transition-colors">
                  <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0A0A0A]" /> Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value as any }))}
                    className="w-full bg-transparent text-gray-900 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="bg-white text-gray-900">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="bg-white rounded-sm p-2.5 border border-[#0A0A0A]/60 focus-within:border-[#0A0A0A] transition-colors">
                  <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#0A0A0A]" /> Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as any }))}
                    className="w-full bg-transparent text-gray-900 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type} className="bg-white text-gray-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Land Title */}
                <div className="bg-white rounded-sm p-2.5 border border-[#0A0A0A]/60 focus-within:border-[#0A0A0A] transition-colors">
                  <label className="block text-[10px] uppercase font-bold text-[#0A0A0A]/90 tracking-wider mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#0A0A0A]" /> Title
                  </label>
                  <select
                    value={filters.titleDocument}
                    onChange={(e) => setFilters(prev => ({ ...prev, titleDocument: e.target.value as any }))}
                    className="w-full bg-transparent text-gray-900 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    {titleOptions.map((title) => (
                      <option key={title} value={title} className="bg-white text-gray-900">
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keyword / Search Button */}
                <button
                  onClick={onSearch}
                  className="w-full bg-[#0A0A0A] hover:bg-[#222222] text-[#FFD600] font-bold text-xs uppercase tracking-wider rounded-sm p-3 flex items-center justify-center gap-2 transition-all shadow-none group active:scale-98"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Explore ({totalListingsCount})</span>
                </button>

              </div>

              {/* Quick Search Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Enclaves:
                </span>
                {['Banana Island', 'Lekki Phase 1', 'Eko Atlantic', 'Ikoyi'].map((tag) => {
                  const isSelected = filters.location === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, location: tag as LocationArea }));
                        onSearch();
                      }}
                      className={`px-3 py-1 rounded-sm border text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        isSelected 
                          ? 'bg-[#0A0A0A] text-[#FFD600] border-[#0A0A0A]' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border-[#0A0A0A]/40'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-[#FFD600]" />}
                      {tag}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Right Column: Live Interactive Spotlight Preview Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="bg-white border border-[#0A0A0A] p-4 sm:p-5 rounded-none shadow-none space-y-4 relative overflow-hidden group/card"
            >
              
              {/* Header with Switcher Tabs & Auto Play/Pause */}
              <div className="flex items-center justify-between border-b border-[#0A0A0A]/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-red-600 animate-pulse'}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Featured Spotlight
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    ({activeSpotlightIndex + 1}/{featuredSpotlights.length})
                  </span>
                </div>

                {/* Property Selection Indicators & Nav Buttons */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {featuredSpotlights.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveSpotlightIndex(idx)}
                        aria-label={`View spotlight ${idx + 1}`}
                        className={`relative h-1.5 rounded-full overflow-hidden transition-all ${
                          activeSpotlightIndex === idx 
                            ? 'w-6 bg-gray-200' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        {activeSpotlightIndex === idx && (
                          <motion.div
                            key={`prog-${activeSpotlightIndex}-${isPaused}`}
                            initial={{ width: 0 }}
                            animate={{ width: isPaused ? '100%' : '100%' }}
                            transition={{ duration: isPaused ? 0 : 4.5, ease: 'linear' }}
                            className="h-full bg-[#0A0A0A] rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    title={isPaused ? "Resume Auto-Carousel" : "Pause Auto-Carousel"}
                    className="p-1 rounded-sm text-gray-600 hover:text-black hover:bg-gray-100 transition-colors ml-1"
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>

                  {/* Prev / Next Arrows */}
                  <div className="flex items-center gap-0.5 border-l border-gray-200 pl-1.5 ml-0.5">
                    <button
                      onClick={handlePrevSpotlight}
                      aria-label="Previous spotlight"
                      className="p-1 rounded-sm text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleNextSpotlight}
                      aria-label="Next spotlight"
                      className="p-1 rounded-sm text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Spotlight Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpotlight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  {/* Spotlight Image with Badges */}
                  <div 
                    onClick={() => onSelectProperty?.(currentSpotlight)}
                    className="relative aspect-[16/10] overflow-hidden bg-gray-100 border border-[#0A0A0A] cursor-pointer group"
                  >
                    <img
                      src={currentSpotlight.mainImage}
                      alt={currentSpotlight.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('unsplash')) {
                          target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent" />
                    
                    {/* Price & Location Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-[#0A0A0A] text-[#FFD600] text-[10px] font-bold uppercase tracking-wider mb-1">
                          {currentSpotlight.location}
                        </span>
                        <div className="text-white text-base font-black uppercase tracking-tight drop-shadow-sm">
                          {formatPrice(currentSpotlight.priceNgn, currency)}
                        </div>
                      </div>

                      <span className="p-2 bg-white text-[#0A0A0A] rounded-sm group-hover:bg-[#FFD600] transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Key Spec Badges */}
                  <div>
                    <h3 
                      onClick={() => onSelectProperty?.(currentSpotlight)}
                      className="text-sm font-black uppercase tracking-tight text-gray-900 hover:text-[#0A0A0A] cursor-pointer line-clamp-1"
                    >
                      {currentSpotlight.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1 font-normal">
                      {currentSpotlight.tagline}
                    </p>
                  </div>

                  {/* Specs & Quick Action Buttons */}
                  <div className="flex items-center justify-between text-[11px] text-gray-700 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-3 font-semibold">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[#0A0A0A]" /> {currentSpotlight.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-[#0A0A0A]" /> {currentSpotlight.bathrooms} Baths
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProperty?.(currentSpotlight)}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-sm transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onBookInspection?.(currentSpotlight)}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#0A0A0A] hover:bg-[#222] text-[#FFD600] rounded-sm transition-colors"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Stats Row with Interactive Hover Effects */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#0A0A0A]/80">
          <div className="group cursor-pointer">
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:translate-x-1 transition-transform">
              ₦48 Billion+
            </span>
            <span className="text-xs text-gray-700 font-medium">Transaction Volume Advisory</span>
          </div>
          <div className="group cursor-pointer">
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:translate-x-1 transition-transform">
              100% Verified
            </span>
            <span className="text-xs text-gray-700 font-medium">Lagos State Title Audit</span>
          </div>
          <div className="group cursor-pointer">
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:translate-x-1 transition-transform">
              Banana Island & VI
            </span>
            <span className="text-xs text-gray-700 font-medium">Exclusive Private Portfolio</span>
          </div>
          <div className="group cursor-pointer">
            <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:translate-x-1 transition-transform">
              24/7 Concierge
            </span>
            <span className="text-xs text-gray-700 font-medium">Diaspora Direct Video Tours</span>
          </div>
        </div>

      </div>
    </div>
  );
};
