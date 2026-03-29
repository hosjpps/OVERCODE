'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { useLanguage } from '@/lib/language';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1280px] mx-auto w-full px-5 md:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display font-bold text-[22px] tracking-[3px] uppercase text-text-primary hover:opacity-80 transition-opacity cursor-pointer">
            OVERCODE
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="relative px-4 py-2 text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors group cursor-pointer">
                {t(link, 'label')}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-accent-purple to-accent-pink transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleLang} className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
              <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'ru' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}>RU</span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'en' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}>EN</span>
            </button>
            <button onClick={() => scrollTo('#contact')} className="bg-gradient-to-r from-accent-purple to-accent-pink text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer">
              {lang === 'ru' ? 'Узнать стоимость →' : 'Get in touch →'}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 w-6 cursor-pointer" aria-label="Menu">
            <span className={`block h-[2px] w-6 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block h-[2px] w-6 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/[0.98] backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-bold text-text-primary hover:text-accent-purple transition-colors cursor-pointer"
              >
                {t(link, 'label')}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-4 flex flex-col items-center gap-4"
            >
              <button onClick={toggleLang} className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
                <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'ru' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>RU</span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'en' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>EN</span>
              </button>
              <button onClick={() => scrollTo('#contact')} className="bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold px-8 py-4 rounded-xl w-64 text-center cursor-pointer">
                {lang === 'ru' ? 'Узнать стоимость →' : 'Get in touch →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
