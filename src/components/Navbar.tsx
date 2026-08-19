import React, { useState } from 'react';
import { Building2, Heart, Phone, MessageSquare, Calculator, Compass, ShieldCheck, ChevronDown, Menu } from 'lucide-react';
import { Currency } from '../types';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';

interface NavbarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenCalculator: () => void;
  onOpenInspectionModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  favoritesCount,
  onOpenFavorites,
  onOpenCalculator,
  onOpenInspectionModal,
  activeSection,
  setActiveSection
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const waMsg = `Hello Babatunde, I am visiting the Naija Prime Realty website and would like to make an inquiry about luxury properties in Lagos.`;
  const whatsappUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, waMsg);

  return (
    <header className="sticky top-0 z-40 bg-[#FFD600]/95 backdrop-blur-xl border-b border-[#0A0A0A] text-[#0A0A0A] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between gap-6">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => setActiveSection('listings')}
          className="flex items-center gap-4 group text-left focus:outline-none shrink-0"
        >
          <div className="w-12 h-12 bg-[#0A0A0A] flex items-center justify-center text-[#FFD600] group-hover:scale-105 transition-transform shadow-none">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:text-[#0A0A0A] transition-colors">
              NAIJA PRIME <span className="text-[#0A0A0A]">REALTY</span>
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-gray-500 uppercase font-sans mt-0.5">
              Lagos • Ikoyi • Lekki
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-600">
          <button
            onClick={() => setActiveSection('listings')}
            className={`transition-all hover:text-[#0A0A0A] ${activeSection === 'listings' ? 'text-[#0A0A0A]' : ''}`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveSection('neighborhoods')}
            className={`transition-all hover:text-[#0A0A0A] flex items-center gap-2 ${activeSection === 'neighborhoods' ? 'text-[#0A0A0A]' : ''}`}
          >
            <Compass className="w-4 h-4" />
            Areas
          </button>
          <button
            onClick={() => setActiveSection('agent')}
            className={`transition-all hover:text-[#0A0A0A] flex items-center gap-2 ${activeSection === 'agent' ? 'text-[#0A0A0A]' : ''}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Advisory
          </button>

          {/* Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button className="transition-all hover:text-[#0A0A0A] flex items-center gap-1.5 py-2">
              Tools <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isToolsOpen ? 'rotate-180 text-[#0A0A0A]' : ''}`} />
            </button>
            
            {isToolsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 pt-6">
                <div className="bg-white border border-[#0A0A0A] p-5 flex flex-col gap-5 shadow-2xl">
                  {/* Currency Selector */}
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">Display Currency</span>
                    <div className="grid grid-cols-3 gap-1 bg-white border border-[#0A0A0A] p-1">
                      {(['NGN', 'USD', 'GBP'] as Currency[]).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`py-2 text-[10px] font-bold transition-colors uppercase ${
                            currency === curr
                              ? 'bg-[#0A0A0A] text-[#FFD600]'
                              : 'text-gray-600 hover:text-white hover:bg-white'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mortgage Calculator */}
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">Financials</span>
                    <button
                      onClick={onOpenCalculator}
                      className="w-full flex items-center gap-3 px-3 py-2.5 bg-white hover:bg-gray-100 text-gray-800 hover:text-[#0A0A0A] transition-colors border border-[#0A0A0A]"
                    >
                      <Calculator className="w-4 h-4 text-[#0A0A0A]" />
                      <span className="text-xs font-semibold">Mortgage Calculator</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Controls: Wishlist, WhatsApp & Inspection CTA */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          
          {/* Wishlist Favorites Counter */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-gray-700 hover:text-[#0A0A0A] transition-colors border border-[#0A0A0A]"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0A0A0A] text-[#FFD600] font-bold text-[10px] w-5 h-5 flex items-center justify-center border border-[#141414]">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 text-[#0A0A0A] border border-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition-all"
            title="Instant WhatsApp Inquiry"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </a>

          {/* Book Inspection Button */}
          <button
            onClick={onOpenInspectionModal}
            className="px-5 py-3 bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] text-xs font-black uppercase tracking-widest transition-colors shadow-none"
          >
            Book Inspection
          </button>
        </div>

      </div>

      {/* Sub-bar for mobile navigation */}
      <div className="lg:hidden flex items-center justify-around bg-[#FFD600] border-t border-[#0A0A0A]/80 py-3 text-[10px] uppercase tracking-widest font-bold text-gray-600">
        <button
          onClick={() => setActiveSection('listings')}
          className={`px-3 py-2 ${activeSection === 'listings' ? 'text-[#0A0A0A]' : ''}`}
        >
          Properties
        </button>
        <button
          onClick={() => setActiveSection('neighborhoods')}
          className={`px-3 py-2 ${activeSection === 'neighborhoods' ? 'text-[#0A0A0A]' : ''}`}
        >
          Areas
        </button>
        <button
          onClick={() => setActiveSection('agent')}
          className={`px-3 py-2 ${activeSection === 'agent' ? 'text-[#0A0A0A]' : ''}`}
        >
          Advisory
        </button>
        <button
          onClick={onOpenCalculator}
          className="px-3 py-2 text-gray-500 flex items-center gap-1.5"
        >
          <Calculator className="w-3.5 h-3.5 text-[#0A0A0A]" />
          Rates
        </button>
      </div>
    </header>
  );
};
