'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, HeartPulse, ShoppingBag, Truck, Sparkles, Factory, GraduationCap, Car } from 'lucide-react';
import { staggerContainer, fadeUp, cardReveal } from '@/lib/animations';
import { cases, niches } from '@/lib/data';
import { useLanguage } from '@/lib/language';

const nicheIcons: Record<string, React.ElementType> = { UtensilsCrossed, HeartPulse, ShoppingBag, Truck, Sparkles, Factory, GraduationCap, Car };

export default function Cases() {
  const { lang, t } = useLanguage();

  return (
    <section id="cases" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="text-center mb-16">
          <motion.span variants={fadeUp} className="inline-block font-mono text-accent-purple text-sm mb-4 tracking-wider">{'// case studies'}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-[32px] md:text-[48px] text-text-primary mb-4">
            {lang === 'ru' ? 'Наши проекты' : 'Our Projects'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            {lang === 'ru' ? 'Проекты, которые уже работают на бизнес наших клиентов.' : 'Projects already working for our clients\' businesses.'}
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cases.map((item, index) => (
            <motion.div key={index} variants={cardReveal} className="glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-purple/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
              <div className="mb-4">
                <span className="font-display font-bold text-[36px] md:text-[48px] gradient-text leading-none">{item.metric}</span>
                <span className="text-text-secondary text-base ml-2">{t(item, 'metricLabel')}</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-relaxed mb-6">{t(item, 'description')}</p>
              <div className="flex flex-wrap gap-2">
                {(lang === 'en' ? item.tagsEn : item.tags).map((tag, i) => (
                  <span key={i} className="font-mono text-xs px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mt-20">
          <motion.p variants={fadeUp} className="text-center text-text-secondary text-base mb-8">
            {lang === 'ru' ? 'Работаем с разными отраслями' : 'We work across industries'}
          </motion.p>
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {niches.map((niche, i) => {
              const Icon = nicheIcons[niche.icon];
              return (
                <div key={i} className="glass rounded-2xl p-5 transition-all duration-300 hover:border-accent-purple/30 hover:-translate-y-1 cursor-default group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <p className="text-text-primary font-semibold text-base group-hover:text-accent-purple transition-colors">
                      {lang === 'en' ? niche.en : niche.ru}
                    </p>
                  </div>
                  <p className="text-text-tertiary text-[13px] leading-relaxed">
                    {lang === 'en' ? niche.descEn : niche.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
