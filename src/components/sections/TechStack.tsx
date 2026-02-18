'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { techLogos } from '@/lib/data';
import { useLanguage } from '@/lib/language';

export default function TechStack() {
  const { lang } = useLanguage();
  return (
    <section
      id="tech-stack"
      className="relative py-24 md:py-32 bg-bg-secondary border-t border-white/5"
    >
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16 px-6"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block font-mono text-accent-purple text-sm mb-4 tracking-wider"
        >
          {'// tech stack'}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="font-display font-bold text-[32px] md:text-[48px] text-text-primary"
        >
          {lang === 'ru' ? 'Инструменты, которым мы доверяем' : 'Tools we trust'}
        </motion.h2>
      </motion.div>

      {/* Marquee Container */}
      <div
        className="group flex flex-col gap-6 overflow-hidden"
        onMouseEnter={(e) => {
          const animations = e.currentTarget.querySelectorAll('[data-marquee]');
          animations.forEach((el) => {
            (el as HTMLElement).style.animationPlayState = 'paused';
          });
        }}
        onMouseLeave={(e) => {
          const animations = e.currentTarget.querySelectorAll('[data-marquee]');
          animations.forEach((el) => {
            (el as HTMLElement).style.animationPlayState = 'running';
          });
        }}
      >
        {/* Row 1 - Left */}
        <div className="flex animate-marquee-left whitespace-nowrap" data-marquee>
          {[...techLogos.row1, ...techLogos.row1].map((name, i) => (
            <div
              key={`r1-${i}`}
              className="flex items-center gap-3 mx-8 shrink-0 transition-colors duration-300"
            >
              <span className="text-text-tertiary font-medium text-[15px] hover:text-white transition-colors duration-300">
                {name}
              </span>
              <span className="text-accent-purple/30 text-lg">/</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Right */}
        <div className="flex animate-marquee-right whitespace-nowrap" data-marquee>
          {[...techLogos.row2, ...techLogos.row2].map((name, i) => (
            <div
              key={`r2-${i}`}
              className="flex items-center gap-3 mx-8 shrink-0 transition-colors duration-300"
            >
              <span className="text-text-tertiary font-medium text-[15px] hover:text-white transition-colors duration-300">
                {name}
              </span>
              <span className="text-accent-purple/30 text-lg">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
