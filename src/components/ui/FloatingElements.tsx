'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CODE_SYMBOLS = ['{ }', '< />', '//', '=>', '( )', '[ ]', '&&', '||', '::', '*.tsx', 'fn()', '$_', 'async', 'const', '<T>', '0x1F'];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingElements() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 22;
    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: CODE_SYMBOLS[i % CODE_SYMBOLS.length],
      x: Math.random() * 95 + 2,
      y: Math.random() * 95 + 2,
      size: isMobile ? 10 + Math.random() * 4 : 11 + Math.random() * 7,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -20,
      opacity: 0.07 + Math.random() * 0.1,
    }));
    setParticles(items);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            color: p.id % 3 === 0 ? 'rgba(124,58,237,0.7)' : p.id % 3 === 1 ? 'rgba(236,72,153,0.5)' : 'rgba(6,182,212,0.5)',
          }}
          animate={{
            y: [0, -50, 15, -30, 0],
            x: [0, 20, -15, 25, 0],
            rotate: [0, 8, -5, 3, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity * 0.6, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        >
          {p.symbol}
        </motion.span>
      ))}

      {/* Subtle grid dots */}
      <div
        className="absolute inset-0 opacity-[0.03] hidden md:block"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
