'use client';

import { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { projects } from '@/lib/data';
import { staggerContainer, fadeUp, cardReveal } from '@/lib/animations';
import { useLanguage } from '@/lib/language';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { t } = useLanguage();
  const isExternal = project.url.startsWith('https://t.me');

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex-shrink-0 w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden group"
    >
      {/* Live iframe preview */}
      {!isExternal && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={project.url}
            title={project.name}
            className="pointer-events-none origin-top-left"
            style={{
              width: '1280px',
              height: '900px',
              transform: 'scale(0.3125)',
              transformOrigin: 'top left',
            }}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts"
            tabIndex={-1}
          />
        </div>
      )}

      {/* Fallback for Telegram links */}
      {isExternal && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.12) 50%, rgba(6,182,212,0.1) 100%)',
          }}
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/20 to-transparent z-10" />

      {/* Project name & badge */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 mb-2">
          {t(project, 'category')}
        </span>
        <h3 className="font-display font-semibold text-text-primary text-base md:text-lg">
          {project.name}
        </h3>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-accent-purple/40 transition-colors duration-300 z-30 pointer-events-none" />
    </motion.a>
  );
}

export default function ShowcaseReel() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });

  return (
    <section id="showcase" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <motion.span variants={fadeUp} className="font-mono text-accent-purple text-sm tracking-wider block mb-4">
            {'// portfolio'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-5xl text-text-primary mb-4">
            {lang === 'ru' ? (<>Наши работы говорят<br className="hidden md:block" />громче слов</>) : (<>Our work speaks<br className="hidden md:block" />louder than words</>)}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-xl">
            {lang === 'ru' ? 'Каждый проект — это решение конкретной бизнес-задачи. Перетяните, чтобы листать.' : 'Every project solves a real business challenge. Drag to scroll.'}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        ref={containerRef}
        className="flex gap-4 md:gap-6 overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing px-5 md:px-[calc((100vw-1280px)/2+24px)] pb-4"
        drag="x"
        dragConstraints={containerRef}
        style={{ x: springX }}
        onDrag={(_, info) => x.set(x.get() + info.delta.x)}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <motion.a
          href="/portfolio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-pink transition-colors font-medium"
        >
          {lang === 'ru' ? 'Все работы' : 'All works'}
          <span className="text-lg">&rarr;</span>
        </motion.a>
      </div>
    </section>
  );
}
