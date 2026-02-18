'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('preloaderShown')) return;
    setShow(true);
    sessionStorage.setItem('preloaderShown', 'true');

    const start = performance.now();
    const duration = 1500;
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(animate);
      else setTimeout(() => setShow(false), 400);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="font-display font-bold text-4xl md:text-6xl tracking-[4px] uppercase"
            style={{
              background: 'linear-gradient(90deg, #F8FAFC 0%, #7C3AED 40%, #EC4899 60%, #F8FAFC 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 1.5s ease-in-out',
            }}
          >
            OVERCODE
          </motion.h1>
          <div className="mt-6 w-48 md:w-52 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
