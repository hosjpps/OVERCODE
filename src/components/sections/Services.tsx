'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Bot, Zap, BarChart3, Play, Plus } from 'lucide-react';
import { services } from '@/lib/data';
import { staggerContainer, fadeUp, cardReveal } from '@/lib/animations';
import { useLanguage } from '@/lib/language';

const iconMap: Record<string, React.ElementType> = { Code2, Bot, Zap, BarChart3, Play };

export default function Services() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-16">
          <motion.span variants={fadeUp} className="font-mono text-accent-purple text-sm tracking-wider block mb-4">{'// services'}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-5xl text-text-primary mb-4">
            {lang === 'ru' ? 'Что мы делаем и сколько это стоит' : 'What we do and what it costs'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-xl">
            {lang === 'ru' ? 'Каждое направление работает отдельно. Вместе — дают x10 к эффективности.' : 'Each service works on its own. Together — they multiply your results.'}
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            const isExpanded = expandedId === service.id;
            const colSpan = service.gridSpan === 3 ? 'lg:col-span-3' : 'lg:col-span-2';
            const features = lang === 'en' ? service.featuresEn : service.features;

            return (
              <motion.div key={service.id} variants={cardReveal} layout className={`${colSpan} glass rounded-2xl p-6 relative group cursor-pointer transition-colors duration-300 hover:border-accent-purple/30`} onClick={() => setExpandedId(isExpanded ? null : service.id)}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.05))' }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-purple/10 text-accent-purple"><Icon size={24} /></div>
                    <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }} className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-text-tertiary hover:text-text-primary hover:border-white/20 transition-colors"><Plus size={16} /></motion.div>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{t(service, 'title')}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{t(service, 'description')}</p>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }} className="overflow-hidden">
                        <div className="pt-5 mt-5 border-t border-white/5">
                          <ul className="space-y-2 mb-5">
                            {features.map((f, i) => (<li key={i} className="flex items-start gap-2 text-sm text-text-secondary"><span className="text-accent-purple mt-0.5 text-xs">&#9654;</span>{f}</li>))}
                          </ul>
                          <div className="mb-4">
                            <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">Stack</span>
                            <p className="text-sm text-text-secondary mt-1">{service.stack}</p>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[140px] p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider block mb-1">{lang === 'ru' ? 'Стоимость' : 'Price'}</span>
                              <span className="text-sm font-medium text-text-primary">{t(service, 'price')}</span>
                            </div>
                            <div className="flex-1 min-w-[140px] p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider block mb-1">{lang === 'ru' ? 'Сроки' : 'Timeline'}</span>
                              <span className="text-sm font-medium text-text-primary">{t(service, 'timeline')}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
