'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { packages } from '@/lib/data';
import { fadeUp, staggerContainer, cardReveal } from '@/lib/animations';
import { useLanguage } from '@/lib/language';

export default function Packages() {
  const { lang, t } = useLanguage();
  return (
    <section id="pricing" className="bg-bg-primary">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20 lg:py-[120px]">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-purple mb-4">// pricing</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.1] text-text-primary mb-4">
            {lang === 'ru' ? 'Готовые пакеты' : 'Packages'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg md:text-xl max-w-[600px] mb-16">
            {lang === 'ru' ? 'Не знаете с чего начать? Выберите пакет или напишите нам — подберём оптимальное решение под ваш бизнес.' : "Not sure where to start? Choose a package or contact us — we'll find the optimal solution for your business."}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center max-w-[400px] lg:max-w-none mx-auto"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 md:p-10 transition-shadow duration-300 ${
                pkg.popular
                  ? 'gradient-border bg-bg-secondary lg:scale-105 z-10 shadow-[0_0_40px_rgba(124,58,237,0.15),0_20px_60px_rgba(0,0,0,0.4)]'
                  : 'glass hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-accent-purple to-accent-pink px-4 py-1.5 rounded-full text-white text-sm font-semibold shadow-[0_4px_12px_rgba(124,58,237,0.3)]">
                  {lang === 'ru' ? 'Популярное' : 'Popular'}
                </div>
              )}

              <h3 className="font-bold text-2xl text-text-primary mb-2">{t(pkg, 'name')}</h3>
              <p className="gradient-text font-display font-bold text-3xl md:text-[40px] mb-2">{t(pkg, 'price')}</p>
              <p className="text-text-secondary text-[15px] mb-6">{t(pkg, 'idealFor')}</p>

              <div className="border-t border-white/[0.06] pt-6 mb-6">
                <ul className="space-y-3">
                  {(lang === 'en' ? pkg.featuresEn : pkg.features).map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent-purple mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-mono text-xs text-text-tertiary border-t border-white/[0.06] pt-4 mb-8">
                {lang === 'ru' ? 'Срок' : 'Timeline'}: {t(pkg, 'timeline')}
              </p>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white animate-pulse-glow hover:brightness-110'
                    : 'border border-white/20 text-text-primary hover:border-white/40 hover:bg-white/[0.05]'
                }`}
              >
                {lang === 'ru' ? 'Обсудить →' : 'Discuss →'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
