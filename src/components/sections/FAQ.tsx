'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUp, cardReveal } from '@/lib/animations';
import { faqItems } from '@/lib/data';
import { useLanguage } from '@/lib/language';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang, t } = useLanguage();
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="text-center mb-16">
          <motion.span variants={fadeUp} className="inline-block font-mono text-accent-purple text-sm mb-4 tracking-wider">{'// faq'}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-[32px] md:text-[48px] text-text-primary mb-4">{lang === 'ru' ? 'Частые вопросы' : 'FAQ'}</motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            {lang === 'ru' ? 'Не нашли ответ? Спросите нашего AI-бота или напишите нам напрямую.' : "Can't find your answer? Ask our AI bot or contact us directly."}
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {faqItems.slice(0, 3).map((item, i) => (
              <FAQItem key={i} item={item} isOpen={openIndex === i} onToggle={() => toggle(i)} t={t} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {faqItems.slice(3, 6).map((item, i) => (
              <FAQItem key={i + 3} item={item} isOpen={openIndex === i + 3} onToggle={() => toggle(i + 3)} t={t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onToggle, t }: {
  item: (typeof faqItems)[number]; isOpen: boolean; onToggle: () => void;
  t: <T extends Record<string, unknown>>(obj: T, field: string) => string;
}) {
  return (
    <motion.div variants={cardReveal} className="glass rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left cursor-pointer">
        <span className="font-semibold text-[18px] text-text-primary pr-4">{t(item, 'question')}</span>
        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple text-xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }} className="overflow-hidden">
            <div className="px-6 pb-6"><p className="text-text-secondary text-[16px] leading-relaxed">{t(item, 'answer')}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
