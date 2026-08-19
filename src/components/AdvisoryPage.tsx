import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Building, 
  Globe2, 
  Send,
  Calendar,
  Clock,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';

interface AdvisoryPageProps {
  onOpenInspectionModal: () => void;
  onExploreListings: () => void;
}

export const AdvisoryPage: React.FC<AdvisoryPageProps> = ({ onOpenInspectionModal, onExploreListings }) => {
  const [inquiryType, setInquiryType] = useState<'title-audit' | 'acquisition' | 'diaspora' | 'off-plan'>('title-audit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    locationInterest: 'Banana Island / Ikoyi',
    budgetRange: '₦500M - ₦1.5B',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Construct prefilled WhatsApp link for immediate advisory follow-up
    const waText = `Hello Babatunde, I submitted an advisory request on your website:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Advisory Type: ${inquiryType}
• Location: ${formData.locationInterest}
• Budget: ${formData.budgetRange}
• Notes: ${formData.message || 'Ready for consultation'}`;

    const waUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, waText);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  const titleSteps = [
    {
      title: "Governor's Consent",
      badge: "Highest Grade",
      desc: "Mandatory legal validation required under the Land Use Act (1978) for every transfer of land ownership previously covered by a Certificate of Occupancy.",
      points: [
        "Ensures seamless legal transfer from previous holder",
        "Registered at Lagos State Lands Bureau, Alausa Secretariat",
        "Unassailable protection against ownership disputes"
      ]
    },
    {
      title: "Certificate of Occupancy (C of O)",
      badge: "Primary Title",
      desc: "Official 99-year state leasehold issued directly by the Executive Governor of Lagos State certifying recognized ownership of virgin or state-allocated land.",
      points: [
        "Valid for 99 years with right of renewal",
        "Direct state recognition with registered survey plan",
        "Bankable collateral for tier-1 commercial loans"
      ]
    },
    {
      title: "Gazette & Excision",
      badge: "Customary Release",
      desc: "Government official publication recording the excision (release) of ancestral land to indigenous communities, making parcels legally available for private purchase.",
      points: [
        "Confirms land is free from global government acquisition",
        "Documented in Lagos State Government official gazette",
        "Survey beacon numbers verified with Office of the State Surveyor-General"
      ]
    },
    {
      title: "Registered Deed of Assignment",
      badge: "Transfer Document",
      desc: "Formal agreement executed between seller (assignor) and buyer (assignee) conveying all rights, title, and interest in the property.",
      points: [
        "Drafted and stamped by accredited Nigerian legal counsel",
        "Submitted alongside Governors Consent application",
        "Accompanied by approved survey plan coordinates"
      ]
    }
  ];

  const advisoryServices = [
    {
      icon: <Scale className="w-6 h-6 text-[#0A0A0A]" />,
      title: "Title Diligence & Land Registry Search",
      desc: "Comprehensive physical and digital title verification at the Lagos State Lands Bureau (Alausa), Surveyor-General's Office, and Probate Registry before commitment."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#0A0A0A]" />,
      title: "Diaspora Acquisition & Escrow Structuring",
      desc: "End-to-end transparent representation for overseas buyers in the UK, US, and Canada including video inspections, Power of Attorney handling, and milestone escrow."
    },
    {
      icon: <Building className="w-6 h-6 text-[#0A0A0A]" />,
      title: "High-Yield Shortlet Portfolio Structuring",
      desc: "Data-driven acquisition of luxury apartments in Victoria Island and Lekki Phase 1 with projected 12% - 16% net annualized returns in NGN and USD."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0A0A0A]" />,
      title: "Off-Plan Milestone & Construction Audit",
      desc: "Independent architectural oversight and escrow payout stage-gates on multi-million Naira off-plan developments in Eko Atlantic, Ikoyi, and Orchid Road."
    }
  ];

  const faqs = [
    {
      q: "How does Naija Prime Realty verify property titles before listing?",
      a: "Every listing in our portfolio undergoes a rigorous 4-tier verification: (1) Root of title search at Lagos State Lands Bureau (Alausa), (2) Charting with the Office of the State Surveyor-General to ensure zero government acquisition encroachment, (3) Physical boundary beacon survey verification, and (4) Corporate/individual litigation check."
    },
    {
      q: "Can Nigerians living in the diaspora safely buy properties without traveling to Lagos?",
      a: "Yes. Over 40% of our clients reside in the UK, United States, and Canada. We facilitate live 4K virtual inspections, independent legal representation, secure milestone-based escrow payments, and deliver registered title deeds directly to your international address via DHL courier."
    },
    {
      q: "What is the difference between Governor's Consent and a C of O?",
      a: "A Certificate of Occupancy (C of O) is the first title document issued by the State Governor when virgin land is allocated. A Governor's Consent is the mandatory approval granted by the Governor whenever that land or building is subsequently sold or transferred to a new buyer."
    },
    {
      q: "What are the standard advisory and transaction closing fees in Lagos?",
      a: "Standard real estate agency commission in Lagos is typically 5% of the transaction value. Legal documentation/perfection fees range from 5% to 10% depending on state stamp duty, registration charges, and governor's consent filing requirements."
    }
  ];

  const whatsappDirectUrl = generateWhatsAppLink(
    AGENT_PROFILE.whatsapp,
    "Hello Babatunde, I would like to schedule a private real estate advisory consultation regarding Lagos luxury properties."
  );

  return (
    <div className="bg-[#FAF8F5] text-[#0A0A0A] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-24 border-b border-[#0A0A0A] relative overflow-hidden">
        {/* Adire subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFD600_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD600] text-[#0A0A0A] text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4 text-red-600 fill-red-600" />
              <span>REDAN Licensed Advisory Firm • Reg No: RED/LGS/2021/884</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black uppercase tracking-tighter text-white leading-none mb-6">
              Private Real Estate <span className="text-[#FFD600]">Advisory</span> & Title Due Diligence
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-2xl mb-8">
              Protecting high-net-worth capital and diaspora investors through uncompromised legal scrutiny, Lagos Lands Registry verification, and prime asset acquisitions in Banana Island, Ikoyi, and Eko Atlantic.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFD600] hover:bg-white text-[#0A0A0A] text-xs font-black uppercase tracking-widest transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Consultation</span>
              </a>

              <button
                onClick={onOpenInspectionModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border-2 border-white text-xs font-black uppercase tracking-widest transition-all"
              >
                <Calendar className="w-4 h-4 text-[#FFD600]" />
                <span>Book Private Inspection</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Credentials Bar */}
      <section className="bg-[#FFD600] border-b-2 border-[#0A0A0A] py-6 text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <span className="block font-black text-sm uppercase tracking-tight">100% Unencumbered</span>
              <span className="text-[11px] text-gray-800 font-medium">Guaranteed Clear Legal Titles</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <span className="block font-black text-sm uppercase tracking-tight">₦48 Billion+</span>
              <span className="text-[11px] text-gray-800 font-medium">Closed Portfolio Volume</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <span className="block font-black text-sm uppercase tracking-tight">14+ Years</span>
              <span className="text-[11px] text-gray-800 font-medium">Lagos Real Estate Experience</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe2 className="w-8 h-8 shrink-0 text-[#0A0A0A]" />
            <div>
              <span className="block font-black text-sm uppercase tracking-tight">Global Representation</span>
              <span className="text-[11px] text-gray-800 font-medium">UK, US, Canada & Diaspora</span>
            </div>
          </div>
        </div>
      </section>

      {/* Title Verification Matrix */}
      <section className="py-16 bg-white border-b-2 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-bold text-[#0A0A0A] tracking-widest block mb-2">
              Legal Due Diligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
              Nigerian Land Title Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              We never broker properties with questionable documentation. Here is how we verify and classify every property title in Lagos State.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {titleSteps.map((item, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F5] border-2 border-[#0A0A0A] flex flex-col justify-between space-y-4 hover:border-black transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-[#0A0A0A]">
                      {item.title}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#FFD600] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-black uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <ul className="space-y-2">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-gray-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Services Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-red-600 tracking-widest block mb-2">
            Tailored Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
            Comprehensive Advisory Scope
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Structured real estate counsel for family offices, diaspora executives, and institutional investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisoryServices.map((svc, idx) => (
            <div key={idx} className="p-6 bg-white border-2 border-[#0A0A0A] space-y-4 hover:bg-[#FFD600]/10 transition-colors">
              <div className="w-12 h-12 bg-[#FFD600] border border-[#0A0A0A] flex items-center justify-center">
                {svc.icon}
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-[#0A0A0A]">
                {svc.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Consultation Request Form */}
      <section className="py-16 bg-[#0A0A0A] text-white border-t-2 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD600] text-[#0A0A0A] text-[10px] font-black uppercase tracking-widest">
                <span>Private Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tighter text-white">
                Request an Advisory Session
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Whether you are vetting a multi-million Naira property in Ikoyi, auditing land titles in Lekki, or building a high-yield shortlet portfolio from the UK or US, our team provides confidential, transparent guidance.
              </p>

              <div className="space-y-4 pt-4 border-t border-gray-800 text-xs">
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-4 h-4 text-[#FFD600]" />
                  <span>Response within 2 business hours</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-[#FFD600]" />
                  <span>Strict non-disclosure & confidential escrow</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-[#FFD600]" />
                  <span>Physical consultations at Capital Towers, VI or via Zoom</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-white text-[#0A0A0A] border-2 border-[#FFD600] p-6 sm:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 border border-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">
                    Advisory Request Submitted
                  </h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Opening direct WhatsApp connection to Babatunde Ademola for immediate consultation.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 bg-[#0A0A0A] text-[#FFD600] text-xs font-bold uppercase tracking-wider mt-4"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Select Advisory Scope
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'title-audit', label: 'Title Audit' },
                        { id: 'acquisition', label: 'Acquisition' },
                        { id: 'diaspora', label: 'Diaspora Rep' },
                        { id: 'off-plan', label: 'Off-Plan' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setInquiryType(tab.id as any)}
                          className={`py-2 px-2 text-center text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                            inquiryType === tab.id
                              ? 'bg-[#0A0A0A] text-[#FFD600] border-[#0A0A0A]'
                              : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Olumide Adeleke"
                        className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +234 803 ... or +44 79..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. olumide@company.com"
                        className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Location of Interest
                      </label>
                      <select
                        value={formData.locationInterest}
                        onChange={(e) => setFormData({ ...formData, locationInterest: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                      >
                        <option value="Banana Island / Ikoyi">Banana Island / Ikoyi</option>
                        <option value="Eko Atlantic City">Eko Atlantic City</option>
                        <option value="Lekki Phase 1">Lekki Phase 1</option>
                        <option value="Victoria Island">Victoria Island</option>
                        <option value="Ikeja GRA">Ikeja GRA</option>
                        <option value="Orchid / Chevron Axis">Orchid / Chevron Axis</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Target Investment Budget (NGN / USD)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                    >
                      <option value="₦150M - ₦350M ($100k - $230k)">₦150M - ₦350M ($100k - $230k)</option>
                      <option value="₦350M - ₦750M ($230k - $500k)">₦350M - ₦750M ($230k - $500k)</option>
                      <option value="₦750M - ₦1.5B ($500k - $1M)">₦750M - ₦1.5B ($500k - $1M)</option>
                      <option value="₦1.5B+ ($1M+ Ultra Luxury)">₦1.5B+ ($1M+ Ultra Luxury)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Specific Inquiries / Property Title Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the property, title search requirements, or investment timeline..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#0A0A0A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#262626] text-[#FFD600] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request & Connect on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold text-red-600 tracking-widest block mb-2">
            Advisory Insights
          </span>
          <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-[#0A0A0A] bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-red-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-gray-700 leading-relaxed border-t border-gray-200 pt-3 bg-[#FAF8F5]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
