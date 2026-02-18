'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useLanguage } from '@/lib/language';

type Message = { role: 'bot' | 'user'; text: string };

interface ChatWidgetProps {
  onClose?: () => void;
  showHeader?: boolean;
  className?: string;
}

const greetings = {
  ru: 'Привет! Я AI-ассистент OVERCODE. Могу рассказать об услугах, ценах, сроках или помочь подобрать решение. Спрашивайте!',
  en: 'Hi! I am OVERCODE AI assistant. I can tell you about our services, pricing, timelines, or help you find the right solution. Ask away!',
};

export default function ChatWidget({ onClose, showHeader = true, className = '' }: ChatWidgetProps) {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: greetings[lang] },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatContainer = useRef<HTMLDivElement>(null);
  const prevLang = useRef(lang);

  // Reset chat when language changes
  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      setMessages([{ role: 'bot', text: greetings[lang] }]);
      setInput('');
    }
  }, [lang]);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply || (lang === 'en' ? 'Sorry, an error occurred. Please try again.' : 'Извините, произошла ошибка. Попробуйте ещё раз.') }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: lang === 'en' ? 'Could not reach the server. Try later or message us on Telegram.' : 'Не удалось связаться с сервером. Попробуйте позже или напишите нам в Telegram.' }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[15px] font-semibold text-text-primary">OVERCODE AI</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      <div ref={chatContainer} className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-white text-xs font-bold flex-shrink-0">O</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'bot'
                ? 'bg-white/[0.06] border border-white/[0.08] rounded-bl'
                : 'bg-accent-purple/20 border border-accent-purple/30 rounded-br'
            }`}>
              <p className="text-text-secondary text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-white text-xs font-bold flex-shrink-0">O</div>
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-text-tertiary animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-text-tertiary animate-pulse [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-text-tertiary animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.06] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder={lang === 'en' ? 'Type a message...' : 'Напишите сообщение...'}
          className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent-purple transition-colors"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || typing}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white disabled:opacity-50 cursor-pointer hover:brightness-110 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
