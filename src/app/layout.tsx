import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/language';
import CookieBanner from '@/components/ui/CookieBanner';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'OVERCODE — Digital Agency | Сайты, AI-боты, Автоматизация',
  description:
    'Разрабатываем сайты, AI-ботов, автоматизацию бизнеса и SaaS-решения. Первая консультация бесплатно.',
  keywords: [
    'веб-разработка',
    'digital agency',
    'AI-боты',
    'автоматизация',
    'SaaS',
    'лендинг',
    'интернет-магазин',
  ],
  openGraph: {
    title: 'OVERCODE — Digital Agency',
    description: 'Мы пишем код. Вы считаете прибыль.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-bg-primary text-text-primary antialiased`}
      >
        <div className="noise-overlay" />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
