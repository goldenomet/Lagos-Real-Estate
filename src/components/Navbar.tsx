import React from 'react';
import { Landmark, Heart, MessageSquare, Calculator, Compass, ShieldCheck } from 'lucide-react';
import { Currency } from '../types';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';
import { motion } from 'motion/react';

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
  const waMsg = `Hello Babatunde, I am visiting the Naija Prime Realty website and would like to make an inquiry about luxury properties in Lagos.`;
  const whatsappUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, waMsg);

  return (
    <header className="sticky top-0 z-40 bg-[#FFD600]/95 backdrop-blur-xl border-b border-[#0A0A0A] text-[#0A0A0A] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between gap-6 relative overflow-hidden">
        {/* Liquid Fluid Background Accents */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none animate-liquid-blob" />
        <div className="absolute -bottom-10 right-1/4 w-36 h-36 bg-[#0A0A0A]/5 rounded-full blur-xl pointer-events-none animate-liquid-blob-slow" />
        <div className="absolute inset-0 pointer-events-none opacity-40 animate-liquid-shimmer" />
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => {
            setActiveSection('listings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-4 group text-left focus:outline-none shrink-0"
        >
          <div className="flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
            <Landmark className="w-8 h-8" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] group-hover:text-[#0A0A0A] transition-colors">
              NAIJA PRIME <span className="text-[#0A0A0A]">REALTY</span>
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-gray-700 uppercase font-sans mt-0.5">
              Lagos • Ikoyi • Lekki
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-700">
          <button
            onClick={() => {
              setActiveSection('listings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-all hover:text-[#0A0A0A] relative py-1 ${activeSection === 'listings' ? 'text-[#0A0A0A] font-black' : ''}`}
          >
            Home
            {activeSection === 'listings' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A]" />
            )}
          </button>
          <button
            onClick={() => {
              setActiveSection('neighborhoods');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-all hover:text-[#0A0A0A] flex items-center gap-2 relative py-1 ${activeSection === 'neighborhoods' ? 'text-[#0A0A0A] font-black' : ''}`}
          >
            <Compass className="w-4 h-4" />
            Areas
            {activeSection === 'neighborhoods' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A]" />
            )}
          </button>
          <button
            onClick={() => {
              setActiveSection('agent');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-all hover:text-[#0A0A0A] flex items-center gap-2 relative py-1 ${activeSection === 'agent' ? 'text-[#0A0A0A] font-black' : ''}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Advisory
            {activeSection === 'agent' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A]" />
            )}
          </button>
        </nav>

        {/* Right Controls: Currency Toggle, Wishlist, WhatsApp & Inspection CTA */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          
          {/* Direct Currency Toggle */}
          <div className="hidden sm:flex items-center bg-white border border-[#0A0A0A] p-0.5">
            {(['NGN', 'USD', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase transition-colors ${
                  currency === curr
                    ? 'bg-[#0A0A0A] text-[#FFD600]'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Wishlist Favorites Counter */}
          
          {/* Wishlist Favorites Counter */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-gray-700 hover:text-[#0A0A0A] transition-transform hover:scale-105 border border-[#0A0A0A]"
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
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 text-[#0A0A0A] border border-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
            title="Instant WhatsApp Inquiry"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </a>

          {/* Book Inspection Button */}
          <button
            onClick={onOpenInspectionModal}
            className="px-5 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-[#FFD600] text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-none"
          >
            Book Inspection
          </button>
        </div>

      </div>

      {/* Sub-bar for mobile navigation */}
      <div className="lg:hidden flex items-center justify-around bg-[#FFD600] border-t border-[#0A0A0A]/80 py-3 text-[10px] uppercase tracking-widest font-bold text-gray-700">
        <button
          onClick={() => {
            setActiveSection('listings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-2 ${activeSection === 'listings' ? 'text-[#0A0A0A] font-black underline' : ''}`}
        >
          Properties
        </button>
        <button
          onClick={() => {
            setActiveSection('neighborhoods');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-2 ${activeSection === 'neighborhoods' ? 'text-[#0A0A0A] font-black underline' : ''}`}
        >
          Areas
        </button>
        <button
          onClick={() => {
            setActiveSection('agent');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-2 ${activeSection === 'agent' ? 'text-[#0A0A0A] font-black underline' : ''}`}
        >
          Advisory
        </button>
        <button
          onClick={onOpenCalculator}
          className="px-3 py-2 text-gray-700 flex items-center gap-1.5"
        >
          <Calculator className="w-3.5 h-3.5 text-[#0A0A0A]" />
          Rates
        </button>
      </div>
    </header>
  );
};

