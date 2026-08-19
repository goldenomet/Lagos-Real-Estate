import React from 'react';
import { Property, Currency } from '../types';
import { formatPrice, generateWhatsAppLink } from '../utils/formatters';
import { AGENT_PROFILE } from '../data/properties';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, MessageSquare, ArrowUpRight } from 'lucide-react';

interface FavoritesDrawerProps {
  favorites: Property[];
  currency: Currency;
  onClose: () => void;
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (p: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favorites,
  currency,
  onClose,
  onRemoveFavorite,
  onSelectProperty
}) => {
  const totalValueNgn = favorites.reduce((sum, p) => sum + p.priceNgn, 0);

  const bulkTitles = favorites.map(f => `• ${f.title} (${f.location})`).join('\n');
  const bulkMessage = `Hello Babatunde, I am reviewing my saved wishlist on your website. I would like more information on these properties:\n\n${bulkTitles}`;
  const whatsappUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, bulkMessage);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-[#0A0A0A]/60 backdrop-blur-sm flex justify-end"
    >
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border-l border-[#0A0A0A] text-[#0A0A0A] h-full flex flex-col justify-between shadow-2xl p-6"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h2 className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
              Saved Portfolio ({favorites.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-white hover:bg-[#0A0A0A] hover:text-[#FFD600] text-gray-700 transition-colors border border-[#0A0A0A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-16 text-gray-500 space-y-2">
              <Heart className="w-10 h-10 mx-auto text-gray-400" />
              <p className="text-xs font-semibold text-gray-700">Your saved listings portfolio is empty.</p>
              <p className="text-[11px] text-gray-500">Click the heart icon on any listing card to save properties for comparison.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {favorites.map((prop) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 bg-[#FFD600]/20 rounded-sm border border-[#0A0A0A] flex items-center justify-between gap-3 group hover:border-[#0A0A0A] transition-all"
                >
                  <img
                    src={prop.mainImage}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-sm object-cover flex-shrink-0 border border-[#0A0A0A]"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#0A0A0A] block truncate">
                      {prop.location} • {prop.bedrooms} Bed
                    </span>
                    <h4 
                      onClick={() => {
                        onSelectProperty(prop);
                        onClose();
                      }}
                      className="text-xs font-sans font-black uppercase tracking-tighter text-gray-900 hover:text-[#0A0A0A] cursor-pointer truncate"
                    >
                      {prop.title}
                    </h4>
                    <span className="text-xs font-mono text-[#0A0A0A] font-bold block mt-0.5">
                      {formatPrice(prop.priceNgn, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(prop.id)}
                    className="p-2 rounded-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="pt-4 border-t border-[#0A0A0A] space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <span className="font-medium">Combined Value:</span>
              <span className="font-sans font-black uppercase tracking-tighter text-[#0A0A0A] text-sm">
                {formatPrice(totalValueNgn, currency)}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-sm bg-[#0A0A0A] hover:bg-[#262626] text-[#FFD600] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-none"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire All via WhatsApp</span>
            </a>
          </div>
        )}

      </motion.div>

    </motion.div>
  );
};

