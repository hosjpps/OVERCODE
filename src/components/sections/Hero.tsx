'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useLanguage } from '@/lib/language';
import AnimatedHeroBackground from '@/components/ui/AnimatedHeroBackground';

const marqueeItems = {
  ru: ['Лендинги', 'AI-боты', 'Автоматизация', 'Веб-приложения', 'Telegram Mini Apps', 'Дашборды', 'E-commerce', 'Motion-графика', 'CRM-интеграции', 'Голосовые ассистенты', 'RAG-системы', 'SEO'],
  en: ['Landing Pages', 'AI Bots', 'Automation', 'Web Apps', 'Telegram Mini Apps', 'Dashboards', 'E-commerce', 'Motion Graphics', 'CRM Integrations', 'Voice Assistants', 'RAG Systems', 'SEO'],
};

export default function Hero() {
  const { lang } = useLanguage();
  const items = marqueeItems[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated living background */}
      <AnimatedHeroBackground />

      {/* Content */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
        <motion.span variants={fadeUp} className="inline-block font-mono text-accent-purple text-sm mb-6 tracking-wider">{'// digital agency'}</motion.span>
        <motion.h1 variants={fadeUp} className="font-display font-bold text-[40px] md:text-[64px] lg:text-[80px] leading-[1.05] text-text-primary mb-6">
          {lang === 'ru' ? (<>Запускаем digital-системы,<br />которые продают за вас</>) : (<>We build digital systems<br />that sell for you</>)}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {lang === 'ru'
            ? 'Один подрядчик — от лендинга до AI-автоматизации. Первый результат через 3 дня.'
            : 'One partner — from landing pages to AI automation. First results in 3 days.'}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-white text-base transition-all duration-300 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
            {lang === 'ru' ? 'Обсудить проект' : 'Get in touch'}
          </a>
          <a href="#showcase" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-text-secondary text-base border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300">
            {lang === 'ru' ? 'Смотреть работы' : 'View portfolio'}
          </a>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/5 bg-bg-primary/50 backdrop-blur-sm">
        <div className="flex animate-marquee-left whitespace-nowrap py-4">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="font-mono text-[13px] uppercase text-text-tertiary mx-6 tracking-wider">
              {item}<span className="ml-6 text-accent-purple/40">/</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
