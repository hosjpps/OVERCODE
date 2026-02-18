'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
}

export default function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const blobsRef = useRef<Blob[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initBlobs = useCallback((width: number, height: number) => {
    const colors = [
      'rgba(124, 58, 237, 0.35)',   // purple
      'rgba(236, 72, 153, 0.30)',   // pink
      'rgba(6, 182, 212, 0.25)',    // cyan
      'rgba(76, 29, 149, 0.28)',    // deep purple
      'rgba(168, 85, 247, 0.22)',   // light purple
      'rgba(219, 39, 119, 0.20)',   // magenta
    ];

    blobsRef.current = colors.map((color, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 150 + Math.random() * 250,
      color,
      phase: (i / colors.length) * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.005,
    }));
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(40, Math.floor((width * height) / 30000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5,
      fadeSpeed: 0.002 + Math.random() * 0.008,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      if (blobsRef.current.length === 0) {
        initBlobs(rect.width, rect.height);
        initParticles(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const mouse = mouseRef.current;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Draw blobs
      for (const blob of blobsRef.current) {
        blob.phase += blob.phaseSpeed;

        // Organic movement
        blob.x += blob.vx + Math.sin(blob.phase) * 0.5;
        blob.y += blob.vy + Math.cos(blob.phase * 0.7) * 0.4;

        // Mouse attraction (subtle)
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400) {
            const force = (400 - dist) / 400 * 0.15;
            blob.x += dx * force * 0.01;
            blob.y += dy * force * 0.01;
          }
        }

        // Bounce off edges softly
        const margin = blob.radius * 0.5;
        if (blob.x < -margin) blob.vx += 0.02;
        if (blob.x > width + margin) blob.vx -= 0.02;
        if (blob.y < -margin) blob.vy += 0.02;
        if (blob.y > height + margin) blob.vy -= 0.02;

        // Damping
        blob.vx *= 0.999;
        blob.vy *= 0.999;

        // Pulsating radius
        const pulseRadius = blob.radius + Math.sin(blob.phase * 1.3) * 30;

        // Draw radial gradient blob
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, pulseRadius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 200
        );
        mouseGradient.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
        mouseGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.06)');
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fillStyle = mouseGradient;
        ctx.fill();
      }

      // Draw particles
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += Math.sin(t * p.fadeSpeed) * 0.01;
        p.opacity = Math.max(0.05, Math.min(0.5, p.opacity));

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initBlobs, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
