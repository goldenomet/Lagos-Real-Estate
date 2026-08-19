import React, { useState } from 'react';
import { Property, Currency } from '../types';
import { formatPrice, formatFullNaira, generateWhatsAppLink } from '../utils/formatters';
import { 
  X, MapPin, Bed, Bath, Maximize2, Car, ShieldCheck, 
  MessageSquare, Phone, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Share2, Copy
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property;
  currency: Currency;
  onClose: () => void;
  onBookInspection: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  onClose,
  onBookInspection
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const formattedPrice = formatPrice(property.priceNgn, currency);
  const fullNairaPrice = formatFullNaira(property.priceNgn);

  const whatsappMessage = `Hello Babatunde, I would like to inquire about "${property.title}" listed for ${fullNairaPrice} in ${property.location}. Could we schedule a physical or live video inspection?`;
  const whatsappUrl = generateWhatsAppLink(property.agentPhone, whatsappMessage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFD600]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6">
      
      <div className="relative bg-white border border-[#0A0A0A] rounded-none w-full max-w-5xl overflow-hidden shadow-none text-[#0A0A0A] flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:px-6 bg-[#FFD600]/80 border-b border-[#0A0A0A] flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A0A0A]">
              {property.location} • {property.propertyType}
            </span>
            <h2 className="text-base sm:text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A] line-clamp-1">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-sm bg-white hover:bg-gray-100 text-gray-700 transition-colors text-xs flex items-center gap-1"
              title="Share Listing"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-white hover:bg-[#0A0A0A] hover:text-[#FFD600] text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Main Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden bg-white border border-[#0A0A0A]">
              <img
                src={property.images[activeImageIndex] || property.mainImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-none bg-[#FFD600]/70 hover:bg-[#0A0A0A] hover:text-[#FFD600] text-[#0A0A0A] backdrop-blur-md border border-[#0A0A0A] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-none bg-[#FFD600]/70 hover:bg-[#0A0A0A] hover:text-[#FFD600] text-[#0A0A0A] backdrop-blur-md border border-[#0A0A0A] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-[#FFD600]/80 px-3 py-1 rounded-sm text-xs font-mono border border-[#0A0A0A] backdrop-blur-md text-[#0A0A0A]">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#0A0A0A] ring-2 ring-[#0A0A0A]/30' : 'border-[#0A0A0A] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Overview & Price Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-[#FFD600]/80 rounded-none border border-[#0A0A0A]">
            <div className="md:col-span-2 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0A0A0A] text-[#FFD600] text-xs font-bold uppercase tracking-wider">
                  {property.status}
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-[#0A0A0A] border border-[#0A0A0A]/30 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Title: {property.titleDocument}
                </span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                <span>{property.address}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-white p-4 rounded-sm border border-[#0A0A0A] flex flex-col justify-center">
              <span className="text-xs uppercase text-gray-500 font-medium">Guide Price</span>
              <span className="text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                {formattedPrice}
              </span>
              <span className="text-[11px] font-mono text-gray-500 mt-0.5">
                Full Naira: {fullNairaPrice}
              </span>
              {property.serviceChargeNgn ? (
                <span className="text-[11px] text-gray-500 mt-1">
                  Est. Service Charge: ₦{(property.serviceChargeNgn / 1000000).toFixed(1)}M/yr
                </span>
              ) : null}
            </div>
          </div>

          {/* Property Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FFD600]/60 rounded-sm border border-[#0A0A0A]/80 text-center">
            <div>
              <Bed className="w-5 h-5 mx-auto text-[#0A0A0A] mb-1" />
              <span className="block text-xs text-gray-500 uppercase font-medium">Bedrooms</span>
              <span className="text-sm font-bold text-[#0A0A0A]">{property.bedrooms} En-suite</span>
            </div>
            <div>
              <Bath className="w-5 h-5 mx-auto text-[#0A0A0A] mb-1" />
              <span className="block text-xs text-gray-500 uppercase font-medium">Bathrooms</span>
              <span className="text-sm font-bold text-[#0A0A0A]">{property.bathrooms} Baths</span>
            </div>
            <div>
              <Maximize2 className="w-5 h-5 mx-auto text-[#0A0A0A] mb-1" />
              <span className="block text-xs text-gray-500 uppercase font-medium">Floor Area</span>
              <span className="text-sm font-bold text-[#0A0A0A]">{property.sizeSqm} sqm</span>
            </div>
            <div>
              <Car className="w-5 h-5 mx-auto text-[#0A0A0A] mb-1" />
              <span className="block text-xs text-gray-500 uppercase font-medium">Parking</span>
              <span className="text-sm font-bold text-[#0A0A0A]">{property.parkingSpaces} Vehicles</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-700 tracking-wider mb-2">
              Property Description & Overview
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities Grid */}
          <div>
            <h3 className="text-sm uppercase font-bold text-gray-700 tracking-wider mb-3">
              Features & Luxury Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-sm bg-[#FFD600]/60 border border-[#0A0A0A]/80 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Land Title Banner */}
          <div className="p-4 bg-[#0A0A0A]/10/30 border border-[#0A0A0A]/30 rounded-sm flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0A0A0A] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                Lagos State Verified Title: {property.titleDocument}
              </h4>
              <p className="text-xs text-gray-700 mt-1 font-normal">
                All legal title documents for this listing have been audited and verified with the Lagos State Ministry of Physical Planning and Urban Development / Lands Bureau. Clean unencumbered title guarantee.
              </p>
            </div>
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:px-6 bg-[#FFD600] border-t border-[#0A0A0A] flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img
              src={property.agentAvatar}
              alt={property.agentName}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-none object-cover border border-[#0A0A0A]/40"
            />
            <div>
              <span className="block text-xs font-bold text-gray-800">{property.agentName}</span>
              <span className="block text-[10px] text-gray-500">Lead Advisory • Naija Prime Realty</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${property.agentPhone}`}
              className="p-2.5 rounded-sm bg-white hover:bg-gray-100 text-gray-800 border border-[#0A0A0A] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-none"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Agent</span>
            </a>

            <button
              onClick={() => onBookInspection(property)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] text-xs font-bold transition-all shadow-none flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Inspection</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
