'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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

  const liveProjects = useMemo(() => projects.filter((p) => 'live' in p && p.live), []);

  const filtered = useMemo(
    () => {
      const base = active === 'all' ? projects.filter((p) => !('live' in p && p.live)) : projects.filter((p) => p.category === active);
      return base;
    },
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
          <button onClick={toggleLang} aria-label="Toggle language" className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
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
              ? `${projects.length} проектов в портфолио. 5 из них уже работают на доменах клиентов.`
              : `${projects.length} projects in portfolio. 5 of them are already live on client domains.`}
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

      {/* Live Projects */}
      {active === 'all' && (
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 pb-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-display font-bold text-xl md:text-2xl text-text-primary">
                {lang === 'ru' ? 'Реальные проекты' : 'Live Projects'}
              </h2>
              <span className="text-text-tertiary text-sm font-mono">{liveProjects.length}</span>
            </motion.div>
            <motion.p variants={fadeUp} className="text-text-secondary text-sm mb-8">
              {lang === 'ru'
                ? 'Проекты, работающие на реальных доменах клиентов прямо сейчас'
                : 'Projects running on real client domains right now'}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveProjects.map((project) => (
              <motion.a
                key={`live-${project.id}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl overflow-hidden block transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:border-green-500/30 relative"
              >
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-[10px] font-mono uppercase">Live</span>
                </div>
                <div className="relative h-[220px] bg-gradient-to-br from-accent-purple/10 to-accent-pink/5 overflow-hidden">
                  {'screenshot' in project && project.screenshot && (
                    <div className="absolute inset-0">
                      <Image src={project.screenshot} alt={project.name} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                    <div>
                      <h3 className="font-bold text-lg text-text-primary">{project.name}</h3>
                      <p className="text-text-secondary text-sm">{t(project, 'description')}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-green-400 transition-colors flex-shrink-0" />
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                    {new URL(project.url).hostname}
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
                    {t(project, 'category')}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="mt-10 border-b border-white/[0.06]" />
        </div>
      )}

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
                  <div className="relative h-[220px] bg-gradient-to-br from-accent-purple/10 to-accent-pink/5 overflow-hidden">
                    {'screenshot' in project && project.screenshot ? (
                      <div className="absolute inset-0">
                        <Image
                          src={project.screenshot}
                          alt={project.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : isExternal && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(236,72,153,0.1) 50%, rgba(6,182,212,0.08) 100%)' }}>
                        <span className="text-4xl opacity-30">
                          {project.category === 'AI-бот' ? '🤖' : '📱'}
                        </span>
                      </div>
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
