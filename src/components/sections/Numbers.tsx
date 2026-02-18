'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { counters } from '@/lib/data';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/lib/language';

function CountUp({ value, suffix, suffixEn }: { value: number; suffix: string; suffixEn?: string }) {
  const { lang } = useLanguage();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 2000;
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="gradient-text font-display font-bold text-4xl md:text-6xl lg:text-7xl">
      {count}{lang === 'en' && suffixEn ? suffixEn : suffix}
    </span>
  );
}

export default function Numbers() {
  const { lang, t } = useLanguage();
  return (
    <section id="numbers" className="bg-bg-secondary border-t border-white/[0.04] border-b border-white/[0.04] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.03),transparent_70%)]" />
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20 lg:py-20 relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-purple mb-4">// results</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.1] text-text-primary mb-14">
            {lang === 'ru' ? 'Цифры, которым можно верить' : 'Numbers you can trust'}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {counters.map((c, i) => (
            <div key={i} className={`text-center py-8 ${i < counters.length - 1 ? 'lg:border-r lg:border-white/[0.06]' : ''}`}>
              <CountUp value={c.value} suffix={c.suffix} suffixEn={c.suffixEn} />
              <p className="text-text-secondary text-sm md:text-base mt-2 max-w-[200px] mx-auto">{t(c, 'label')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
