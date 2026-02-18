'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { fadeUp, staggerContainer, cardReveal } from '@/lib/animations';
import { useLanguage } from '@/lib/language';
import Footer from '@/components/layout/Footer';

export default function PortfolioPage() {
  const { lang, t, toggleLang } = useLanguage();
  const [active, setActive] = useState('all');

  // Build categories from data with i18n
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return [
      { key: 'all', ru: 'Все', en: 'All' },
      ...cats.map((cat) => {
        const proj = projects.find((p) => p.category === cat)!;
        return { key: cat, ru: cat, en: proj.categoryEn };
      }),
    ];
  }, []);

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Sticky Header */}
      <div className="border-b border-white/[0.06] bg-bg-secondary/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="font-display font-bold text-lg tracking-[3px] uppercase text-text-primary hover:opacity-80 transition-opacity">
              OVERCODE
            </Link>
          </div>
          <button onClick={toggleLang} className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'ru' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>RU</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'en' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>EN</span>
          </button>
        </div>
      </div>

      <main className="flex-1">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 pt-12 pb-8">

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-purple mb-4">
            {'// portfolio'}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.1] text-text-primary mb-4">
            {lang === 'ru' ? 'Все работы' : 'All Works'}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg md:text-xl max-w-[600px] mb-12">
            {lang === 'ru'
              ? `${projects.length} проектов в портфолио. Каждый — реальный бизнес с реальными результатами.`
              : `${projects.length} projects in portfolio. Each one — a real business with real results.`}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                active === cat.key
                  ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                  : 'glass text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
            >
              {lang === 'en' ? cat.en : cat.ru}
              {cat.key !== 'all' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {projects.filter((p) => p.category === cat.key).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 pb-20">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const isExternal = project.url.startsWith('https://t.me');
              return (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardReveal}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  whileHover={{ y: -6 }}
                  className="group glass rounded-2xl overflow-hidden block transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:border-accent-purple/30"
                >
                  {/* Live preview */}
                  <div className="relative h-[220px] bg-gradient-to-br from-accent-purple/10 to-accent-pink/5 overflow-hidden">
                    {/* iframe — desktop only */}
                    {!isExternal && (
                      <iframe
                        src={project.url}
                        title={project.name}
                        className="pointer-events-none origin-top-left hidden md:block"
                        style={{
                          width: '1280px',
                          height: '900px',
                          transform: 'scale(0.32)',
                          transformOrigin: 'top left',
                        }}
                        loading="lazy"
                        sandbox="allow-same-origin allow-scripts"
                        tabIndex={-1}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                      <div>
                        <h3 className="font-bold text-lg text-text-primary">{project.name}</h3>
                        <p className="text-text-secondary text-sm">{t(project, 'description')}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-accent-purple transition-colors flex-shrink-0" />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
                      {t(project, 'category')}
                    </span>
                    <span className="text-text-tertiary text-xs font-mono">#{String(project.id).padStart(2, '0')}</span>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-text-tertiary text-center py-20">
            {lang === 'ru' ? 'Нет проектов в этой категории' : 'No projects in this category'}
          </p>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}
