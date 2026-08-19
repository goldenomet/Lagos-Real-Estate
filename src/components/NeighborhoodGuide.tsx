import React from 'react';
import { NEIGHBORHOODS } from '../data/properties';
import { LocationArea } from '../types';
import { MapPin, TrendingUp, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface NeighborhoodGuideProps {
  onSelectArea: (location: LocationArea) => void;
}

export const NeighborhoodGuide: React.FC<NeighborhoodGuideProps> = ({ onSelectArea }) => {
  return (
    <section className="gsap-neighborhood-section py-16 sm:py-24 bg-white text-[#0A0A0A] border-t border-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-[#0A0A0A] tracking-widest block mb-2">
            Lagos State Prime Enclaves
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
            Neighborhood Intelligence
          </h2>
          <p className="mt-3 text-gray-500 text-sm font-normal">
            Compare rental yields, security profiles, and capital appreciation rates across Lagos State’s most sought-after residential and financial districts.
          </p>
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBORHOODS.map((nh) => (
            <div
              key={nh.name}
              className="gsap-neighborhood-card group bg-white border border-[#0A0A0A] rounded-none overflow-hidden hover:border-[#0A0A0A]/40 transition-all duration-300 flex flex-col justify-between shadow-none"
            >
              {/* Image & Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <img
                  src={nh.image}
                  alt={nh.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD600] via-[#FFD600]/40 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase font-bold text-[#0A0A0A] tracking-wider block">
                    Lagos Prime Zone
                  </span>
                  <h3 className="text-xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                    {nh.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-700 font-normal leading-relaxed">
                  {nh.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-white rounded-sm border border-[#0A0A0A] text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block font-medium">Avg. Capital Price</span>
                    <span className="font-sans font-black uppercase tracking-tighter text-[#0A0A0A] text-xs">{nh.averagePriceRangeNgn}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block font-medium">Est. Rental Yield</span>
                    <span className="font-sans font-black uppercase tracking-tighter text-[#0A0A0A] text-xs">{nh.rentalYield}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">District Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {nh.highlights.map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-gray-700 border border-[#0A0A0A] text-[10px]">
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Area Properties CTA */}
                <button
                  onClick={() => onSelectArea(nh.name)}
                  className="w-full py-2.5 rounded-sm bg-white hover:bg-[#0A0A0A] hover:text-[#FFD600] text-gray-800 border border-[#0A0A0A] text-xs font-semibold flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <span>Explore {nh.name} Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
