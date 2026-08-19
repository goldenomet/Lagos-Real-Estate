import React from 'react';
import { Property, Currency } from '../types';
import { formatPrice, generateWhatsAppLink } from '../utils/formatters';
import { Bed, Bath, Maximize2, MapPin, Heart, ShieldCheck, MessageSquare, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBookInspection: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onBookInspection
}) => {
  const formattedPrice = formatPrice(property.priceNgn, currency);

  const whatsappMessage = `Hello Babatunde, I saw the property "${property.title}" listed for ${formattedPrice} in ${property.location} on your website and would like to receive more details or schedule an inspection.`;
  const whatsappUrl = generateWhatsAppLink(property.agentPhone, whatsappMessage);

  return (
    <div className="gsap-property-card group bg-white rounded-none overflow-hidden border border-[#0A0A0A] hover:border-[#0A0A0A]/40 transition-all duration-300 flex flex-col justify-between shadow-none hover:shadow-none hover:shadow-black/10">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#FFD600]">
        <img
          src={property.mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('unsplash')) {
              target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider shadow-none ${
              property.status === 'For Sale' ? 'bg-[#0A0A0A] text-[#FFD600]' :
              property.status === 'For Rent' ? 'bg-[#0A0A0A] text-[#FFD600]' :
              property.status === 'Shortlet' ? 'bg-[#0A0A0A] text-[#FFD600]' : 'bg-[#0A0A0A] text-[#FFD600]'
            }`}>
              {property.status}
            </span>
            <span className="px-2.5 py-1 rounded-none bg-white/90 text-gray-800 border border-[#0A0A0A]/60 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-[#0A0A0A]" />
              {property.titleDocument}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`pointer-events-auto p-2 rounded-none transition-all backdrop-blur-md ${
              isFavorite
                ? 'bg-[#0A0A0A] text-[#FFD600] shadow-none'
                : 'bg-white/80 hover:bg-white text-gray-700 border border-[#0A0A0A]/50'
            }`}
            title="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#0A0A0A] text-[#0A0A0A]' : ''}`} />
          </button>
        </div>

        {/* Location Pill at bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-gray-800 font-medium bg-[#FFD600]/80 px-2.5 py-1 rounded-sm border border-[#0A0A0A] backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline / Subtitle */}
          <span className="text-[11px] uppercase tracking-widest text-[#0A0A0A] font-bold block mb-1">
            {property.propertyType}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-base font-sans font-black uppercase tracking-tighter text-[#0A0A0A] hover:text-[#0A0A0A] cursor-pointer line-clamp-2 transition-colors"
          >
            {property.title}
          </h3>

          <p className="mt-1 text-xs text-gray-500 line-clamp-2 font-normal">
            {property.tagline}
          </p>

          {/* Specs Bar */}
          <div className="mt-4 grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#FFD600]/60 rounded-sm border border-[#0A0A0A]/80 text-xs text-gray-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-gray-500" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Studio'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-gray-500" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
              <span>{property.sizeSqm} sqm</span>
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-5 pt-4 border-t border-[#0A0A0A]/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-gray-500 block font-medium">Guide Price</span>
            <span className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
              {formattedPrice}
            </span>
            {property.pricePeriod && property.pricePeriod !== 'one-off' && (
              <span className="text-[10px] text-gray-500 ml-1">/{property.pricePeriod}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/30 text-[#0A0A0A] border border-[#0A0A0A]/30 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={() => onSelectProperty(property)}
              className="px-3.5 py-2 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#FFD600] text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
