'use client';

import { motion, useInView } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket, TrendingUp } from 'lucide-react';
import { processSteps } from '@/lib/data';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/lib/language';
import { useRef } from 'react';

const icons = [MessageSquare, Palette, Code2, Rocket, TrendingUp];

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

const mobileVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

/* SVG path that weaves between 5 columns in a sine-wave style
   Viewbox: 1200 x 120, cards are at x: 120, 360, 600, 840, 1080 */
const WAVE_PATH = 'M 0,60 C 60,60 80,20 120,20 C 160,20 200,60 240,60 C 280,60 320,100 360,100 C 400,100 440,60 480,60 C 520,60 560,20 600,20 C 640,20 680,60 720,60 C 760,60 800,100 840,100 C 880,100 920,60 960,60 C 1000,60 1040,20 1080,20 C 1120,20 1160,60 1200,60';

/* Node positions on the path (approximate x,y for each of the 5 steps) */
const NODE_POSITIONS = [
  { x: 120, y: 20 },
  { x: 360, y: 100 },
  { x: 600, y: 20 },
  { x: 840, y: 100 },
  { x: 1080, y: 20 },
];

export default function Process() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="process" className="bg-bg-secondary border-t border-white/[0.04] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20 lg:py-[120px] relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-purple mb-4">// process</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.1] text-text-primary mb-4">
            {lang === 'ru' ? 'Как мы работаем' : 'How we work'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg md:text-xl max-w-[600px] mb-16 md:mb-20">
            {lang === 'ru' ? 'Прозрачный процесс от первого звонка до запуска. Вы всегда знаете, на каком этапе проект.' : 'Transparent process from first call to launch. You always know the project stage.'}
          </motion.p>
        </motion.div>

        {/* Desktop — Creative wave timeline */}
        <div className="hidden lg:block" ref={sectionRef}>
          <div className="relative">
            {/* SVG Wave path */}
            <svg
              viewBox="0 0 1200 120"
              fill="none"
              className="absolute top-0 left-0 w-full h-[120px] z-0"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <filter id="pathGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background path */}
              <path d={WAVE_PATH} stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />

              {/* Animated gradient path */}
              <motion.path
                d={WAVE_PATH}
                stroke="url(#pathGrad)"
                strokeWidth="2"
                fill="none"
                filter="url(#pathGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />

              {/* Traveling glow dot */}
              {isInView && (
                <circle r="4" fill="#7C3AED" filter="url(#pathGlow)">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                    <mpath href="#travelPath" />
                  </animateMotion>
                </circle>
              )}
              <path id="travelPath" d={WAVE_PATH} fill="none" />

              {/* Node circles at each step */}
              {NODE_POSITIONS.map((pos, i) => (
                <g key={i}>
                  {/* Outer glow ring */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="16"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  />
                  {/* Inner filled circle */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="8"
                    fill="#0A0A0F"
                    stroke="url(#pathGrad)"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  />
                  {/* Center dot */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="3"
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.2 }}
                  />
                </g>
              ))}
            </svg>

            {/* Vertical connector lines from wave nodes to cards */}
            {NODE_POSITIONS.map((pos, i) => {
              const leftPercent = (pos.x / 1200) * 100;
              // Wave is 120px tall. Node y maps to pixel: pos.y * (120/120) = pos.y
              // Cards start at 160px. Even cards (i%2=0) at 160px, odd at 192px (160+32)
              const nodePixelY = pos.y;
              const cardTopY = i % 2 === 0 ? 160 : 192;
              const lineHeight = cardTopY - nodePixelY;
              return (
                <div
                  key={`connector-${i}`}
                  className="absolute z-[5]"
                  style={{ left: `${leftPercent}%`, top: `${nodePixelY}px`, transform: 'translateX(-50%)' }}
                >
                  <div className="relative w-[2px]" style={{ height: `${lineHeight}px` }}>
                    <div className="absolute inset-0 bg-white/[0.04]" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-accent-purple/60 to-accent-purple/10"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
                      style={{ originY: 0 }}
                    />
                  </div>
                  {/* Small diamond connector at bottom */}
                  <motion.div
                    className="w-[6px] h-[6px] rotate-45 bg-accent-purple/40 -ml-[2px]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.3 + i * 0.15, duration: 0.3 }}
                  />
                </div>
              );
            })}

            {/* Cards grid — positioned below the wave, staggered */}
            <div className="grid grid-cols-5 gap-5 pt-[160px] relative z-10">
              {processSteps.map((step, i) => {
                const Icon = icons[i];
                const isUp = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`group ${isUp ? 'mt-0' : 'mt-8'}`}
                  >
                    <motion.div
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="relative"
                    >
                      {/* Card */}
                      <div className="glass rounded-2xl p-6 transition-all duration-300 group-hover:border-accent-purple/30 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] relative overflow-hidden min-h-[220px] flex flex-col">
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/[0.06] via-transparent to-accent-cyan/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex-1">
                          {/* Top row: icon + number */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-[44px] h-[44px] rounded-xl bg-accent-purple/[0.08] border border-accent-purple/20 flex items-center justify-center group-hover:bg-accent-purple/[0.15] group-hover:border-accent-purple/30 transition-all duration-300">
                              <Icon className="w-5 h-5 text-accent-purple" />
                            </div>
                            <span className="font-display font-bold text-[40px] leading-none text-white/[0.04] group-hover:text-accent-purple/[0.08] transition-colors duration-500">{step.number}</span>
                          </div>

                          <h3 className="font-bold text-[17px] text-text-primary mb-2 leading-tight">{t(step, 'title')}</h3>
                          <p className="text-text-secondary text-sm leading-relaxed">{t(step, 'description')}</p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-[60px] h-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-[1px] h-[30px] bg-gradient-to-b from-accent-purple/40 to-transparent" />
                          <div className="absolute top-0 right-0 w-[30px] h-[1px] bg-gradient-to-l from-accent-purple/40 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile — Vertical cards */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] z-0">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-accent-purple via-accent-pink to-accent-cyan"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ originY: 0 }}
            />
          </div>

          <div className="space-y-8">
            {processSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={mobileVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Icon on the line */}
                  <div className="absolute left-0 top-4 z-10">
                    <div className="w-[56px] h-[56px] rounded-2xl bg-bg-secondary border border-white/[0.08] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.15)]">
                      <Icon className="w-5 h-5 text-accent-purple" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass rounded-2xl p-5 ml-2">
                    <span className="font-mono text-xs text-accent-purple/60 mb-1 block">{step.number}</span>
                    <h3 className="font-bold text-lg text-text-primary mb-2">{t(step, 'title')}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{t(step, 'description')}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
