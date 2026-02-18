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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[100] bg-bg-tertiary/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 shadow-2xl"
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            {isEn
              ? 'We use cookies to improve your experience. By continuing to use the site, you agree to our '
              : 'Мы используем cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с '}
            <Link href="/cookies" className="text-accent-purple hover:underline">
              {isEn ? 'Cookie Policy' : 'Политикой cookie'}
            </Link>
            .
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={accept}
              className="flex-1 bg-gradient-to-r from-accent-purple to-accent-pink text-white text-sm font-medium py-2 rounded-xl hover:brightness-110 transition-all cursor-pointer"
            >
              {isEn ? 'Accept' : 'Принять'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
