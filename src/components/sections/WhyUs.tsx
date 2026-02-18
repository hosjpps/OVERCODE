'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, cardReveal } from '@/lib/animations';
import { whyUsCards } from '@/lib/data';
import { useLanguage } from '@/lib/language';

export default function WhyUs() {
  const { lang, t } = useLanguage();

  return (
    <section id="why-us" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="text-center mb-16">
          <motion.span variants={fadeUp} className="inline-block font-mono text-accent-purple text-sm mb-4 tracking-wider">{'// why us'}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-[32px] md:text-[48px] text-text-primary mb-4">
            {lang === 'ru' ? 'Почему OVERCODE' : 'Why OVERCODE'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            {lang === 'ru' ? 'Один партнёр вместо десятка подрядчиков. Всё под ключ — от идеи до прибыли.' : 'One partner instead of ten contractors. Turnkey — from idea to profit.'}
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyUsCards.map((card, i) => (
            <motion.div key={i} variants={cardReveal} className={`glass rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-lg relative overflow-hidden ${card.size === 'large' ? 'md:col-span-2 min-h-[160px] md:min-h-[180px]' : ''}`}>
              {card.size === 'large' && <div className="absolute top-0 right-0 w-48 h-48 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(124,58,237,0.15), transparent 70%)' }} />}
              <h3 className={`font-bold text-text-primary mb-3 relative z-10 ${card.size === 'large' ? 'text-[22px]' : 'text-[20px]'}`}>{t(card, 'title')}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed relative z-10">{t(card, 'description')}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
