'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ChatWidget from '@/components/ui/ChatWidget';

export default function StickyChat() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] animate-[sticky-pulse_2s_ease-in-out_infinite] cursor-pointer hover:brightness-110 transition-all"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] max-md:w-screen max-md:h-screen max-md:bottom-0 max-md:right-0 max-md:rounded-none rounded-2xl bg-[#111118] border border-white/[0.08] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <ChatWidget onClose={() => setOpen(false)} className="h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
