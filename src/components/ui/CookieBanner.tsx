'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[100] bg-bg-tertiary/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 md:p-4 shadow-2xl"
        >
          <div className="flex items-center gap-3 md:block">
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed flex-1">
              {isEn
                ? <>We use <Link href="/cookies" className="text-accent-purple hover:underline">cookies</Link>.</>
                : <>Мы используем <Link href="/cookies" className="text-accent-purple hover:underline">cookie</Link>.</>}
              <span className="hidden md:inline">
                {isEn
                  ? ' By continuing to use the site, you agree to our Cookie Policy.'
                  : ' Продолжая использовать сайт, вы соглашаетесь с Политикой cookie.'}
              </span>
            </p>
            <button
              onClick={accept}
              className="bg-gradient-to-r from-accent-purple to-accent-pink text-white text-xs md:text-sm font-medium py-1.5 px-4 md:py-2 md:mt-3 md:w-full rounded-xl hover:brightness-110 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              {isEn ? 'OK' : 'ОК'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
