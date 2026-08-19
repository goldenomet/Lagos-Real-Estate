import React from 'react';
import { AGENT_PROFILE, TESTIMONIALS } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';
import { Phone, Mail, MapPin, Award, ShieldCheck, MessageSquare, Star, CheckCircle, ExternalLink } from 'lucide-react';

export const AgentSection: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(
    AGENT_PROFILE.whatsapp,
    "Hello Babatunde, I am seeking personalized real estate advisory services in Lagos State."
  );

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFD600] text-[#0A0A0A] border-t border-[#0A0A0A] overflow-hidden">
      {/* Minimalist Adire-inspired Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="adire-agent" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0,30 L30,0 L60,30 L30,60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="30" cy="30" r="5" fill="currentColor" />
            <path d="M15,15 L45,45 M45,15 L15,45" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#adire-agent)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-[#0A0A0A] tracking-widest block mb-2">
            Trusted Lagos Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
            Meet the Principal Partner
          </h2>
          <p className="mt-3 text-gray-500 text-sm font-normal">
            Over a decade of advisory excellence connecting discerning Nigerian HNWIs and diaspora buyers to verified high-yield luxury real estate in Lagos.
          </p>
        </div>

        {/* Profile Card Grid */}
        <div className="gsap-agent-card bg-white border border-[#0A0A0A] rounded-none p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-none mb-16 relative overflow-hidden">
          {/* Liquid Fluid Card Background Effects */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFD600]/30 rounded-full blur-2xl pointer-events-none animate-liquid-blob" />
          <div className="absolute -bottom-16 -left-12 w-56 h-56 bg-[#FFD600]/25 rounded-full blur-2xl pointer-events-none animate-liquid-blob-slow" />
          <div className="absolute inset-0 pointer-events-none opacity-30 animate-liquid-shimmer" />
          
          {/* Agent Photo */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-none overflow-hidden border border-[#0A0A0A] bg-[#FFD600] shadow-none relative">
              <img
                src={AGENT_PROFILE.avatar}
                alt={AGENT_PROFILE.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-sm border border-[#0A0A0A]">
                <span className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                  {AGENT_PROFILE.license}
                </span>
                <span className="block text-[11px] text-gray-700 mt-0.5">
                  Verified with Real Estate Developers Association of Nigeria (REDAN)
                </span>
              </div>
            </div>
          </div>

          {/* Bio & Track Record */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-none bg-white border border-[#0A0A0A] text-[#0A0A0A] text-xs font-semibold uppercase tracking-wider">
                {AGENT_PROFILE.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] mt-2">
                {AGENT_PROFILE.name}
              </h3>
              <p className="text-xs text-[#0A0A0A]/90 font-mono mt-1">
                {AGENT_PROFILE.company}
              </p>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {AGENT_PROFILE.bio}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#0A0A0A]">
              <div>
                <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                  {AGENT_PROFILE.salesVolumeNgn}
                </span>
                <span className="text-[11px] text-gray-500">Closed Volume</span>
              </div>
              <div>
                <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                  {AGENT_PROFILE.experienceYears}+ Years
                </span>
                <span className="text-[11px] text-gray-500">Lagos Market Advisory</span>
              </div>
              <div>
                <span className="block text-2xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
                  100%
                </span>
                <span className="text-[11px] text-gray-500">Title Guarantee</span>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                <span>{AGENT_PROFILE.office}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                <span>{AGENT_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                <span>{AGENT_PROFILE.phone}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#FFD600] text-xs font-semibold flex items-center gap-2 transition-all shadow-none"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct WhatsApp Consultation</span>
              </a>

              <a
                href={`tel:${AGENT_PROFILE.phone}`}
                className="px-4 py-2.5 rounded-sm bg-white hover:bg-gray-100 text-gray-800 border border-[#0A0A0A] text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#0A0A0A]" />
                <span>Call Office</span>
              </a>
            </div>

          </div>

        </div>

        {/* Testimonials */}
        <div className="gsap-testimonials-container">
          <h3 className="text-xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A] mb-8 text-center">
            Client Experiences & Diaspora Feedback
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="gsap-testimonial-card bg-white border border-[#0A0A0A] rounded-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#0A0A0A] mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#5A5A40]" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic font-normal leading-relaxed mb-4">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0A0A0A]/80">
                  <span className="block text-xs font-bold text-[#0A0A0A]">{test.clientName}</span>
                  <span className="block text-[10px] text-[#0A0A0A]/90">{test.role}</span>
                  <span className="block text-[10px] text-gray-500">{test.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
