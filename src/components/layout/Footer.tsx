'use client';

import Link from 'next/link';
import { navLinks } from '@/lib/data';
import { useLanguage } from '@/lib/language';

const policyLinks = [
  { href: '/privacy', label: 'Политика конфиденциальности', labelEn: 'Privacy Policy' },
  { href: '/cookies', label: 'Политика использования cookie', labelEn: 'Cookie Policy' },
  { href: '/personal-data', label: 'Обработка персональных данных', labelEn: 'Personal Data Processing' },
];

export default function Footer() {
  const { lang, t } = useLanguage();
  return (
    <footer className="bg-bg-secondary border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-text-primary tracking-widest uppercase">OVERCODE</span>
            <span className="text-text-tertiary text-sm">© 2026</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                {t(link, 'label')}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://t.me/hosjpps" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Telegram</a>
            <a href="mailto:info@overcode.space" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Email</a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 pt-6 border-t border-white/[0.04]">
          {policyLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-text-tertiary text-xs hover:text-text-secondary transition-colors">
              {t(link, 'label')}
            </Link>
          ))}
        </div>

        <p className="text-text-tertiary text-xs text-center mt-4">{lang === 'ru' ? 'Москва, Россия' : 'Moscow, Russia'}</p>
      </div>
    </footer>
  );
}
