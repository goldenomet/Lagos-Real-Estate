import React, { useState } from 'react';
import { Property, InspectionBooking } from '../types';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink, formatFullNaira } from '../utils/formatters';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, User, Phone, Mail, MessageSquare } from 'lucide-react';

interface InspectionModalProps {
  property?: Property;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  property,
  onClose
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [type, setType] = useState<InspectionBooking['type']>('In-Person Inspection');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const propTitle = property ? property.title : 'General Lagos Luxury Property';
  const propLoc = property ? property.location : 'Ikoyi / Lekki / VI';

  const waMessage = `Hello Babatunde, I have booked an inspection for "${propTitle}" in ${propLoc}.\n\nName: ${clientName}\nPhone: ${clientPhone}\nDate: ${date}\nTime: ${timeSlot}\nType: ${type}\nNotes: ${notes}`;
  const whatsappUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, waMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFD600]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-[#0A0A0A] rounded-none w-full max-w-lg overflow-hidden shadow-none text-[#0A0A0A] p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0A0A0A]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#0A0A0A] tracking-wider block">
              Private Advisory Session
            </span>
            <h2 className="text-lg font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
              Schedule Property Inspection
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-white hover:bg-[#0A0A0A] hover:text-[#FFD600] text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-[#0A0A0A]/30 rounded-none flex items-center justify-center mx-auto text-[#0A0A0A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-sans font-black uppercase tracking-tighter text-[#0A0A0A]">
              Inspection Booking Received!
            </h3>

            <p className="text-xs text-gray-700 max-w-sm mx-auto font-normal leading-relaxed">
              Thank you, <strong className="text-[#0A0A0A]">{clientName}</strong>. Principal Lead Babatunde Ademola will confirm your appointment for <strong className="text-[#0A0A0A]">{date} at {timeSlot}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-none"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {property && (
              <div className="p-3 bg-[#FFD600] rounded-sm border border-[#0A0A0A] text-xs">
                <span className="text-[10px] uppercase font-bold text-[#0A0A0A] block">Selected Property</span>
                <span className="font-sans font-black uppercase tracking-tighter text-gray-800 block truncate">{property.title}</span>
                <span className="text-gray-500 text-[11px] block">{property.location} • {formatFullNaira(property.priceNgn)}</span>
              </div>
            )}

            {/* Inspection Type Selector */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-700 mb-1">
                Inspection Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'In-Person Inspection',
                  'WhatsApp Live Video Tour',
                  'Virtual 3D Walkthrough'
                ].map((fmt) => (
                  <button
                    type="button"
                    key={fmt}
                    onClick={() => setType(fmt as any)}
                    className={`p-2.5 rounded-sm border text-[11px] font-semibold text-center transition-all ${
                      type === fmt
                        ? 'bg-[#0A0A0A] text-[#FFD600] border-[#0A0A0A] shadow-none'
                        : 'bg-[#FFD600] border-[#0A0A0A] text-gray-700 hover:border-[#0A0A0A]'
                    }`}
                  >
                    {fmt.replace(' Inspection', '').replace(' Tour', '').replace(' Walkthrough', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Dr. Chidi Okafor"
                  className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
            </div>

            {/* Email & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-700 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-700 mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-white border border-[#0A0A0A] rounded-sm p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
              >
                <option value="10:00 AM">10:00 AM Morning</option>
                <option value="12:00 PM">12:00 PM Noon</option>
                <option value="02:00 PM">02:00 PM Afternoon</option>
                <option value="04:30 PM">04:30 PM Late Afternoon Sunset</option>
              </select>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-sm bg-[#0A0A0A] hover:bg-[#333333] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all shadow-none mt-2"
            >
              Confirm Appointment
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
