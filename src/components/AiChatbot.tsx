import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Landmark, ArrowUpRight, RotateCcw, Minimize2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENT_PROFILE } from '../data/properties';
import { generateWhatsAppLink } from '../utils/formatters';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiChatbotProps {
  onOpenInspectionModal?: () => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ onOpenInspectionModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoHidden, setIsAutoHidden] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I'm **Adunni**, your AI Luxury Property & Investment Advisor at **Naija Prime Realty**.\n\nHow may I assist you with your Lagos real estate search, title verification, or investment structuring today?`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  // Auto-hide on side after 4 seconds of inactivity when closed
  const resetAutoHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setIsAutoHidden(false);

    if (!isOpen) {
      hideTimerRef.current = setTimeout(() => {
        setIsAutoHidden(true);
      }, 4000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetAutoHideTimer();
    } else {
      setIsAutoHidden(false);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isOpen]);

  // Auto-hide when user scrolls page
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen && !isHovered) {
        setIsAutoHidden(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, isHovered]);

  const quickPrompts = [
    'Banana Island Waterfront Mansions',
    'Eko Atlantic Penthouses',
    "Governor's Consent vs C of O",
    'Lekki Phase 1 Duplexes',
    'Shortlet Investment in VI'
  ];

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || "I apologize, I couldn't process your request right now. Please feel free to reach out to Babatunde Ademola on WhatsApp.";

      const botMessage: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `Thank you for your inquiry. For immediate personalized assistance with Lagos luxury properties, feel free to contact our Principal Advisor **Babatunde Ademola** directly at **+234 803 892 4110** or on WhatsApp.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    const paragraphs = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {paragraphs.map((para, pIdx) => {
          if (!para.trim()) return <div key={pIdx} className="h-1" />;
          
          const parts = para.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={pIdx}>
              {parts.map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={partIdx} className="font-bold text-[#0A0A0A]">{part.slice(2, -2)}</strong>;
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const waMsg = `Hello Babatunde, I was using the AI Property Advisor on your website and would like to speak directly with an advisor regarding luxury listings in Lagos.`;
  const whatsappUrl = generateWhatsAppLink(AGENT_PROFILE.whatsapp, waMsg);

  return (
    <>
      {/* Side-Docked Auto-Hiding Trigger */}
      {!isOpen && (
        <motion.div
          className="fixed right-0 bottom-24 sm:bottom-28 z-40 flex items-center justify-end"
          onMouseEnter={() => {
            setIsHovered(true);
            setIsAutoHidden(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            resetAutoHideTimer();
          }}
          initial={{ x: 0 }}
          animate={{
            x: isAutoHidden && !isHovered ? 'calc(100% - 44px)' : 0
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center bg-[#0A0A0A] text-[#FFD600] border-y-2 border-l-2 border-[#0A0A0A] shadow-2xl hover:bg-[#222] transition-all rounded-l-md overflow-hidden group pl-2.5 pr-4 py-2.5"
            title="Open AI Property Advisor"
          >
            {/* Peeking Edge Icon Handle */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping absolute -top-1 -right-1" />
                <span className="w-2 h-2 rounded-full bg-red-600 absolute -top-1 -right-1" />
                <Landmark className="w-5 h-5 text-red-600 fill-red-600 group-hover:scale-110 transition-transform" />
              </div>

              {/* Text Label - slides in and out seamlessly */}
              <div className="text-left whitespace-nowrap pl-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span>AI Advisor</span>
                  <span className="px-1.5 py-0.2 bg-[#FFD600] text-[#0A0A0A] text-[9px] font-bold">Online</span>
                </div>
                <div className="text-[10px] text-gray-300 font-normal">
                  Lagos Property Intelligence
                </div>
              </div>

              <ChevronLeft className="w-4 h-4 text-[#FFD600] opacity-80 group-hover:translate-x-[-2px] transition-transform ml-1" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Expanded Chat Drawer / Card */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white border-2 border-[#0A0A0A] shadow-2xl flex flex-col rounded-none overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-[#FFD600] px-4 py-3 border-b-2 border-[#0A0A0A] flex items-center justify-between text-[#0A0A0A]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-none bg-[#0A0A0A] flex items-center justify-center text-red-600 shadow-sm">
                    <Landmark className="w-4 h-4 fill-red-600" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-tight text-[#0A0A0A] flex items-center gap-1.5">
                      <span>Adunni • AI Property Advisor</span>
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-gray-800 font-medium block">
                      Naija Prime Realty Intelligence
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMessages([
                      {
                        id: 'welcome',
                        role: 'model',
                        text: `Conversation reset. How may I assist you with your Lagos real estate search or investment portfolio?`,
                        timestamp: 'Just now'
                      }
                    ])}
                    title="Reset conversation"
                    className="p-1.5 text-[#0A0A0A] hover:bg-black/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsAutoHidden(true);
                    }}
                    title="Dock to side"
                    className="p-1.5 text-[#0A0A0A] hover:bg-black/10 transition-colors flex items-center gap-0.5 text-xs font-bold"
                  >
                    <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Hide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-none bg-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Landmark className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] p-3 rounded-none text-left ${
                          isUser
                            ? 'bg-[#0A0A0A] text-white border border-[#0A0A0A]'
                            : 'bg-white text-gray-800 border border-[#0A0A0A] shadow-sm'
                        }`}
                      >
                        {formatMessageText(msg.text)}
                        <div className={`text-[9px] mt-1.5 font-mono ${isUser ? 'text-gray-400 text-right' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-none bg-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5">
                      <Landmark className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                    </div>
                    <div className="bg-white border border-[#0A0A0A] p-3 rounded-none shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0A0A0A] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#0A0A0A] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#0A0A0A] animate-bounce" />
                      <span className="text-[11px] text-gray-500 ml-1 font-medium">Adunni is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-3 py-2 bg-white border-t border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    disabled={loading}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-[#FFD600] text-[#0A0A0A] border border-gray-300 hover:border-[#0A0A0A] text-[10px] font-bold uppercase tracking-wider rounded-none shrink-0 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Direct WhatsApp / Inspection Links */}
              <div className="px-3 py-1.5 bg-[#FAF8F5] border-t border-gray-200 flex items-center justify-between text-[11px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                {onOpenInspectionModal && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsAutoHidden(true);
                      onOpenInspectionModal();
                    }}
                    className="text-gray-700 font-bold hover:text-[#0A0A0A] hover:underline"
                  >
                    Book Private Inspection
                  </button>
                )}
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-2.5 bg-white border-t-2 border-[#0A0A0A] flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties, legal titles, prices..."
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-300 focus:border-[#0A0A0A] focus:bg-white text-gray-900 rounded-none focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-3.5 py-2 bg-[#0A0A0A] text-[#FFD600] disabled:bg-gray-300 disabled:text-gray-500 font-bold rounded-none transition-colors"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
