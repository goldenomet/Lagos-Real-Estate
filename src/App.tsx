import React, { useState, useMemo, useEffect } from 'react';
import { Property, FilterState, Currency, LocationArea } from './types';
import { PROPERTIES } from './data/properties';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyFilter } from './components/PropertyFilter';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AgentSection } from './components/AgentSection';
import { AdvisoryPage } from './components/AdvisoryPage';
import { NeighborhoodGuide } from './components/NeighborhoodGuide';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { InspectionModal } from './components/InspectionModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CustomCursor } from './components/CustomCursor';
import { AiChatbot } from './components/AiChatbot';
import { Footer } from './components/Footer';
import { Building2, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useGsapScroll } from './hooks/useGsapScroll';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [activeSection, setActiveSection] = useState<'listings' | 'neighborhoods' | 'agent'>('listings');

  // Mount GSAP ScrollTrigger effects
  useGsapScroll();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    location: 'All Locations',
    status: 'All Statuses',
    propertyType: 'All Types',
    minPrice: 0,
    maxPrice: 3000000000,
    minBedrooms: 0,
    titleDocument: 'All Titles',
    sortBy: 'featured'
  });

  // Favorites (persisted in localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('naija_prime_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-2'];
    } catch (e) {
      return ['prop-1', 'prop-2'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('naija_prime_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      // ignore
    }
  }, [favoriteIds]);

  // Modal states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [inspectionProperty, setInspectionProperty] = useState<Property | null>(null);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted Properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesDesc && !matchesLoc) {
          return false;
        }
      }

      // Location
      if (filters.location !== 'All Locations' && p.location !== filters.location) {
        return false;
      }

      // Status
      if (filters.status !== 'All Statuses' && p.status !== filters.status) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'All Types' && p.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedrooms
      if (filters.minBedrooms > 0 && p.bedrooms < filters.minBedrooms) {
        return false;
      }

      // Title Document
      if (filters.titleDocument !== 'All Titles' && p.titleDocument !== filters.titleDocument) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (filters.sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (filters.sortBy === 'newest') return (b.yearBuilt || 2024) - (a.yearBuilt || 2024);
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [filters]);

  const favoriteProperties = useMemo(() => {
    return PROPERTIES.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  const handleSelectArea = (location: LocationArea) => {
    setFilters((prev) => ({ ...prev, location }));
    setActiveSection('listings');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const handleOpenInspectionForProperty = (p: Property) => {
    setInspectionProperty(p);
    setIsInspectionOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFD600] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-[#FFD600]">
      {/* GSAP Scroll Progress Indicator */}
      <div
        id="gsap-scroll-progress"
        className="fixed top-0 left-0 right-0 h-1 bg-[#0A0A0A] z-50 origin-left scale-x-0 transition-transform pointer-events-none"
      />
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenInspectionModal={() => {
          setInspectionProperty(null);
          setIsInspectionOpen(true);
        }}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section (Listings View Only) */}
        {activeSection === 'listings' && (
          <HeroSection
            filters={filters}
            setFilters={setFilters}
            currency={currency}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onBookInspection={handleOpenInspectionForProperty}
            onSearch={() => {
              setActiveSection('listings');
              const el = document.getElementById('listings-container');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            totalListingsCount={PROPERTIES.length}
          />
        )}

        {/* Section View Switcher */}
        {activeSection === 'listings' && (
          <section id="listings-container" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Liquid Fluid Ambient Backdrops */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/25 rounded-full blur-3xl pointer-events-none animate-liquid-blob" />
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#0A0A0A]/5 rounded-full blur-3xl pointer-events-none animate-liquid-blob-slow" />
            <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-white/20 rounded-full blur-2xl pointer-events-none animate-liquid-blob" />
            
            {/* Filter Toolbar */}
            <PropertyFilter
              filters={filters}
              setFilters={setFilters}
              totalResults={filteredProperties.length}
            />

            {/* Property Cards Grid */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-white/50 rounded-none border border-[#0A0A0A] p-8 space-y-4">
                <Building2 className="w-12 h-12 text-gray-500 mx-auto" />
                <h3 className="text-xl font-sans font-black uppercase tracking-tighter text-gray-800">
                  No listings match your filter criteria
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto font-normal">
                  Try adjusting your area filter or price range. We also have private off-market listings in Banana Island and Ikoyi available upon direct request.
                </p>
                <button
                  onClick={() => setFilters({
                    searchQuery: '',
                    location: 'All Locations',
                    status: 'All Statuses',
                    propertyType: 'All Types',
                    minPrice: 0,
                    maxPrice: 3000000000,
                    minBedrooms: 0,
                    titleDocument: 'All Titles',
                    sortBy: 'featured'
                  })}
                  className="px-4 py-2 bg-[#0A0A0A] text-[#FFD600] font-bold text-xs rounded-sm hover:bg-[#333333] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    currency={currency}
                    isFavorite={favoriteIds.includes(prop.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectProperty={(p) => setSelectedProperty(p)}
                    onBookInspection={handleOpenInspectionForProperty}
                  />
                ))}
              </div>
            )}

          </section>
        )}

        {/* Neighborhoods View */}
        {activeSection === 'neighborhoods' && (
          <NeighborhoodGuide onSelectArea={handleSelectArea} />
        )}

        {/* Advisory Full Page View */}
        {activeSection === 'agent' && (
          <AdvisoryPage
            onOpenInspectionModal={() => {
              setInspectionProperty(null);
              setIsInspectionOpen(true);
            }}
            onExploreListings={() => {
              setActiveSection('listings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Show Agent below listings on home view */}
        {activeSection === 'listings' && (
          <AgentSection />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers with AnimatePresence */}
      <AnimatePresence>
        {/* Property Detail Modal */}
        {selectedProperty && (
          <PropertyDetailModal
            key="property-detail-modal"
            property={selectedProperty}
            currency={currency}
            onClose={() => setSelectedProperty(null)}
            onBookInspection={(p) => {
              setSelectedProperty(null);
              handleOpenInspectionForProperty(p);
            }}
          />
        )}

        {/* Mortgage & Rates Calculator Modal */}
        {isCalculatorOpen && (
          <MortgageCalculatorModal
            key="mortgage-calc-modal"
            currency={currency}
            onClose={() => setIsCalculatorOpen(false)}
          />
        )}

        {/* Inspection Modal */}
        {isInspectionOpen && (
          <InspectionModal
            key="inspection-modal"
            property={inspectionProperty || undefined}
            onClose={() => {
              setIsInspectionOpen(false);
              setInspectionProperty(null);
            }}
          />
        )}

        {/* Saved Favorites Wishlist Drawer */}
        {isFavoritesOpen && (
          <FavoritesDrawer
            key="favorites-drawer"
            favorites={favoriteProperties}
            currency={currency}
            onClose={() => setIsFavoritesOpen(false)}
            onRemoveFavorite={toggleFavorite}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}
      </AnimatePresence>

      {/* Brand Logo Custom Pointer Cursor */}
      <CustomCursor />

      {/* AI Luxury Real Estate Chatbot */}
      <AiChatbot onOpenInspectionModal={() => setIsInspectionOpen(true)} />

    </div>
  );
}
