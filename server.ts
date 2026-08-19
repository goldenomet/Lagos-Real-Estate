import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Naija Prime Realty API' });
  });

  // AI Chatbot endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemPrompt = `You are "Adunni", the AI Luxury Property & Investment Advisor at "Naija Prime Realty", Lagos Nigeria's leading prime real estate advisory founded by Babatunde Ademola.
You provide sophisticated, knowledgeable, and culturally attuned real estate guidance for high-net-worth individuals, institutional investors, and diaspora clients looking to acquire, lease, or invest in luxury properties across Lagos.

Key Areas of Expertise:
1. Prime Lagos Neighborhoods:
   - Banana Island, Ikoyi: Ultra-luxury, maximum security, waterfront villas, billionaire row, high capital preservation (₦1.2B - ₦4.5B+).
   - Old Ikoyi: Historic diplomatic and expatriate enclave, leafy avenues, high rental yields (8%-10%).
   - Eko Atlantic City: Africa's futuristic smart coastal city with independent power/water grid, wave defense, and oceanfront penthouses.
   - Lekki Phase 1: High-energy lifestyle and tech hub, contemporary duplexes, rooftop pools, strong shortlet demand (₦280M - ₦850M).
   - Victoria Island & Oniru: Financial center, commercial towers, boutique waterfront suites, prime business hubs.
   - Ikeja GRA: Mainland premier leafy sanctuary, close to Murtala Muhammed International Airport.

2. Nigerian Land Title Documents:
   - Governor's Consent: Mandatory state-approved title transfer endorsement under the Land Use Act 1978.
   - Certificate of Occupancy (C of O): Primary 99-year state government land grant.
   - Gazette & Excision: Traditional / ancestral communal land cleared and recognized by the state government.
   - Registered Deed of Assignment & Survey Plan: Legal instrument transferring property ownership.

3. Available Portfolio Highlights:
   - The Solitaire Mansion (Zone A, Banana Island) - 5 Bed Waterfront Villa (₦1.85 Billion)
   - The Azure Penthouse (Azuri Towers, Eko Atlantic) - 4 Bed Oceanfront Sky Residence (₦920 Million)
   - Minimalist Contemporary Duplex (Lekki Phase 1) - 4 Bed with Roof Deck & Pool (₦380 Million)
   - The Crest (Glover Road, Old Ikoyi) - 3 Bed Serviced Luxury Apartment (₦30M / year rent)
   - The Sovereign Villa (Isaac John Axis, Ikeja GRA) - 5 Bed Detached on 1,200 sqm (₦680 Million)
   - Shortlet Luxury Suite (Akin Adesola, VI) - 2 Bed Waterfront Suite (₦180,000 / night)
   - The Terraces at Orchid (Lekki) - 4 Bed Smart Terrace Duplex Off-Plan (₦165 Million, 30% deposit)

4. Tone & Style:
   - Professional, courteous, warm, and distinctly knowledgeable in Lagos real estate dynamics.
   - Clear and concise explanations. Keep answers direct and well structured with bold headings or bullet points where helpful.
   - Promptly offer to connect with Babatunde Ademola (+234 803 892 4110) or book a private inspection when appropriate.`;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        
        // Build contents from conversation history
        const formattedContents = [];
        
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            formattedContents.push({
              role: item.role === 'model' ? 'model' : 'user',
              parts: [{ text: item.text }]
            });
          }
        }

        formattedContents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: formattedContents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        });

        const reply = response.text || "Thank you for reaching out to Naija Prime Realty. How can I assist you with your Lagos property search today?";
        return res.json({ reply });
      }

      // Intelligent local advisory fallback when API key is not configured
      const lower = message.toLowerCase();
      let fallbackReply = '';

      if (lower.includes('banana island') || lower.includes('mansion') || lower.includes('waterfront')) {
        fallbackReply = `**Banana Island** is Nigeria's most prestigious enclave with maximum security and private jetty access.\n\nWe currently feature **The Solitaire Mansion** in Zone A, Banana Island — a 5-bedroom waterfront estate listed at **₦1.85 Billion** ($1.21M USD) with an infinity pool, private lagoon docking, and full smart home automation. Would you like to schedule a private inspection?`;
      } else if (lower.includes('eko atlantic') || lower.includes('penthouse') || lower.includes('ocean')) {
        fallbackReply = `**Eko Atlantic City** offers world-class independent power and flood-free infrastructure.\n\nOur premier listing is **The Azure Penthouse** at Azuri Towers (22nd floor) listed at **₦920 Million** with 360-degree ocean views, marble finishes, and concierge services. Let us know if you'd like the full brochure or a virtual tour!`;
      } else if (lower.includes('lekki') || lower.includes('duplex') || lower.includes('380m') || lower.includes('affordable')) {
        fallbackReply = `In **Lekki Phase 1**, we have the **Minimalist Contemporary Duplex** off Admiralty Way for **₦380 Million** with a private plunge pool, rooftop terrace, and Governor's Consent. It offers an estimated 10% rental yield in the Lekki corridor.`;
      } else if (lower.includes('title') || lower.includes('consent') || lower.includes('c of o') || lower.includes('legal') || lower.includes('document')) {
        fallbackReply = `At Naija Prime Realty, all our listings undergo rigorous title verification with the Lagos State Lands Registry:\n\n• **Governor's Consent**: Confirms state executive approval for property transfer.\n• **Certificate of Occupancy (C of O)**: Direct state government land grant.\n• **Registered Deed of Assignment**: Formal title transfer document.\n\nOur legal advisory team assists diaspora and local buyers with end-to-end title searches.`;
      } else if (lower.includes('shortlet') || lower.includes('rent') || lower.includes('per night') || lower.includes('airbnb')) {
        fallbackReply = `For shortlet and luxury rentals in Lagos:\n\n• **VI Waterfront Shortlet Suite** (Akin Adesola, VI) — **₦180,000/night** with 24/7 power, superfast fiber internet, and lagoon balcony.\n• **The Crest Luxury Apartment** (Glover Rd, Old Ikoyi) — **₦30 Million/year** serviced 3-bed.\n\nWould you like to reserve dates or check availability?`;
      } else if (lower.includes('agent') || lower.includes('babatunde') || lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp')) {
        fallbackReply = `You can connect directly with our Principal Advisor, **Babatunde Ademola**:\n\n📞 **Phone/WhatsApp**: +234 803 892 4110\n📧 **Email**: babatunde@naijaprimerealty.com\n🏢 **Office**: Level 5, Capital Towers, Victoria Island, Lagos\n\nClick the "Chat on WhatsApp" button or use the Book Inspection form anytime!`;
      } else {
        fallbackReply = `Welcome to **Naija Prime Realty**! I am Adunni, your AI luxury property advisor.\n\nI can help you explore:\n• Luxury properties across **Banana Island, Ikoyi, Eko Atlantic, and Lekki Phase 1**\n• Title document verification (Governor's Consent, C of O)\n• Diaspora investment advisory and mortgage financing estimates\n• Scheduling private on-site inspections\n\nWhat type of property or location are you interested in today?`;
      }

      return res.json({ reply: fallbackReply });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      return res.status(500).json({
        error: 'Failed to process AI chat request',
        message: error.message || 'An unexpected error occurred'
      });
    }
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Naija Prime Realty server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
