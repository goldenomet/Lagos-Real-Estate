import React from 'react';
import { Landmark, MapPin, Phone, Mail, ShieldCheck, MessageSquare, ArrowUpRight } from 'lucide-react';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';

export const Footer: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(
    AGENT_PROFILE.whatsapp,
    "Hello Babatunde, I am interested in real estate investment options in Lagos State."
  );

  return (
    <footer className="bg-[#FFD600] text-[#0A0A0A] border-t border-[#0A0A0A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#0A0A0A]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center text-red-600">
                <Landmark className="w-7 h-7" />
              </div>
              <span className="text-lg font-sans font-black uppercase tracking-tighter uppercase text-[#0A0A0A]">
                NAIJA PRIME <span className="text-[#0A0A0A] font-normal">REALTY</span>
              </span>
            </div>

            <p className="text-xs text-gray-500 font-normal max-w-sm leading-relaxed">
              Lagos State’s premier minimalist real estate agency & advisory firm. Delivering unencumbered title luxury properties in Ikoyi, Banana Island, Victoria Island, Eko Atlantic, and Lekki Phase 1.
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-sm bg-white border border-[#0A0A0A] text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
              <span>REDAN Licensed Member • Reg No: RED/LGS/2021/884</span>
            </div>
          </div>

          {/* Quick Enclaves */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
              Prime Enclaves
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#listings" className="hover:text-[#0A0A0A] transition-colors">Banana Island, Ikoyi</a></li>
              <li><a href="#listings" className="hover:text-[#0A0A0A] transition-colors">Old Ikoyi Mansions</a></li>
              <li><a href="#listings" className="hover:text-[#0A0A0A] transition-colors">Eko Atlantic Oceanfront</a></li>
              <li><a href="#listings" className="hover:text-[#0A0A0A] transition-colors">Lekki Phase 1 Smart Homes</a></li>
              <li><a href="#listings" className="hover:text-[#0A0A0A] transition-colors">Ikeja GRA Luxury Lots</a></li>
            </ul>
          </div>

          {/* Legal Titles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
              Title Verifications
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-500">• Governor's Consent</span></li>
              <li><span className="text-gray-500">• Certificate of Occupancy (C of O)</span></li>
              <li><span className="text-gray-500">• Gazette & Federal C of O</span></li>
              <li><span className="text-gray-500">• Deed of Assignment</span></li>
              <li><span className="text-gray-500">• Lagos State Lands Registry Audit</span></li>
            </ul>
          </div>

          {/* Contact Office */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
              Advisory Office
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0A0A0A] flex-shrink-0 mt-0.5" />
                <span>Level 5, Capital Towers, Ahmadu Bello Way, Victoria Island, Lagos</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0A0A0A] flex-shrink-0" />
                <span>+234 803 892 4110</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0A0A0A] flex-shrink-0" />
                <span>babatunde@naijaprimerealty.com</span>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/30 text-[#0A0A0A] border border-[#0A0A0A]/30 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Naija Prime Realty Ltd. All rights reserved. Registered in Nigeria.</p>
          <p className="text-[11px] font-normal">
            Design inspired by{' '}
            <a
              href="https://reliabilityiq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A0A0A] font-semibold underline hover:text-black transition-colors inline-flex items-center gap-0.5"
            >
              <span>ReliabilityIQ Ventures</span>
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
